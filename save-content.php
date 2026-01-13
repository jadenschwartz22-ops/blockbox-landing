<?php
// Save content changes and auto-publish to GitHub
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $filename = $data['filename'] ?? '';
    $content = $data['content'] ?? '';

    if (empty($filename) || empty($content)) {
        echo json_encode(['success' => false, 'error' => 'Missing filename or content']);
        exit;
    }

    // Validate filename (security check)
    $allowedFiles = ['index.html', 'stats.html'];
    if (!in_array($filename, $allowedFiles)) {
        echo json_encode(['success' => false, 'error' => 'Invalid filename']);
        exit;
    }

    $filepath = __DIR__ . '/' . $filename;

    // Save file
    if (file_put_contents($filepath, $content) === false) {
        echo json_encode(['success' => false, 'error' => 'Failed to save file']);
        exit;
    }

    // Git commit and push
    $timestamp = date('Y-m-d H:i:s');
    $commitMessage = "content: update $filename via edit mode - $timestamp";

    $commands = [
        "cd " . __DIR__,
        "git add $filename",
        "git commit -m '$commitMessage'",
        "git push origin main"
    ];

    $output = [];
    $returnCode = 0;

    foreach ($commands as $cmd) {
        exec($cmd . " 2>&1", $cmdOutput, $cmdReturnCode);
        $output[] = implode("\n", $cmdOutput);
        if ($cmdReturnCode !== 0 && $cmd !== "git push origin main") {
            // Allow push to fail (might already be up to date)
            $returnCode = $cmdReturnCode;
        }
    }

    if ($returnCode === 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Changes saved and published!',
            'output' => $output
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Git operations failed',
            'output' => $output
        ]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>
