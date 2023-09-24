<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drag and Drop</title>
    <style>
        .dropArea {
            height: 100px;
            width: 300px;
            border: 1px solid black;
            display: inline-block;
            margin-right: 5px;
        }

        .sidebar {
            flex: 1;
            width: 300px;
            padding-bottom: 20px;
        }
    </style>
</head>

<body>
    <div style="display: flex;">
        <!-- Sidebar with chips and input -->
        <div class="sidebar">
            <!-- Chips -->
            <div draggable="true" ondragstart="dragStart(event)" data-content="div">div</div>
            <div draggable="true" ondragstart="dragStart(event)" data-content="h1">h1</div>
            <div draggable="true" ondragstart="dragStart(event)" data-content="button">button</div>
            <div draggable="true" ondragstart="dragStart(event)" data-content="function">function</div>
            <div draggable="true" ondragstart="dragStart(event)" data-content="array">array</div>

            <!-- Input for creating new chips -->
            <input type="text" id="customChipInput" style="width: 100%;" placeholder="Enter chip name and press Enter">
        </div>

        <!-- Main area -->
        <div style="flex: 3; position: relative;">
            <div class="dropArea" ondrop="drop(event)" ondragover="allowDrop(event)">Drop here</div>
        </div>
    </div>

    <script src="script.js"></script>
</body>

</html>
