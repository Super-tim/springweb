function uploadFile() {
    var fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.onchange = function() {
        var file = fileInput.files[0];
        var formData = new FormData();
        formData.append('file', file);

        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('File upload failed.');
        })
        .then(data => {
            // Handle success, update UI if needed
            console.log('File uploaded successfully:', data);
            document.getElementById('statusArea').innerText = 'File uploaded successfully.';
        })
        .catch(error => {
            // Handle error
            console.error('Error uploading file:', error);
            document.getElementById('statusArea').innerText = 'Error uploading file.';
        });
    };
    fileInput.click();
}

function downloadFile() {
            var selectedFile = document.getElementById("taskSelect").value;
            var url = '/api/download?selectedFile=' + encodeURIComponent(selectedFile);
            console.log(url)
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.responseType = 'blob';

            xhr.onload = function() {
                if (xhr.status === 200) {
                    var blob = xhr.response;
                    var filename = selectedFile;
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    console.error('Download failed. Status code: ' + xhr.status);
                }
            };

            xhr.onerror = function() {
                console.error('Request failed');
            };

            xhr.send();
        }

function generateReport() {
    var taskId = document.getElementById("taskSelect").value;
    // Implement report generation logic using /api/generateReport endpoint
    // You can use window.location or fetch API
}

async function executeTask() {
    // 获取下拉框选择的值作为参数
    var selectedValue = document.getElementById('taskSelect').value;

    // 显示状态为RUNNING
    var statusDisplay = document.getElementById('statusArea');
    statusDisplay.textContent = 'status: RUNNING';
    await new Promise(resolve => setTimeout(resolve, 2000));
    // 发起API请求
    fetch('/api/executor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            parameter: selectedValue
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.text();
    })
    .then(data => {
        // 根据接口返回内容更新状态显示
        statusDisplay.textContent = 'status: success';
    })
    .catch(error => {
        console.error('Error during fetch:', error);
        statusDisplay.textContent = 'status: failed';
    });
}


