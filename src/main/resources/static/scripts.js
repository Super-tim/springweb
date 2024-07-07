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

function generateReport(reportData) {
    // 假设reportData是一个包含多个对象的数组，每个对象代表报表的一行
    let reportHtml = '<table border="1"><thead><tr>';
    const reportData = [
            {
                "id": 1,
                "product": "笔记本电脑",
                "quantity": 5,
                "saleDate": "2023-04-01",
                "amount": 12000
            }
        ];
    // 假设我们知道reportData的第一个对象的键将用作表头
    if (reportData.length > 0) {
        for (const key in reportData[0]) {
            if (reportData[0].hasOwnProperty(key)) {
                reportHtml += `<th>${key}</th>`;
            }
        }
        reportHtml += '</tr></thead><tbody>';

        // 遍历数据并添加到表格中
        reportData.forEach(row => {
            reportHtml += '<tr>';
            for (const key in row) {
                if (row.hasOwnProperty(key)) {
                    reportHtml += `<td>${row[key]}</td>`;
                }
            }
            reportHtml += '</tr>';
        });

        reportHtml += '</tbody></table>';

        // 假设我们有一个ID为'reportContainer'的div元素来显示报表
        const reportContainer = document.getElementById('reportContainer');
        if (reportContainer) {
            reportContainer.innerHTML = reportHtml; // 显示报表
        } else {
            console.error('No report container found!');
        }
    } else {
        console.log('No report data to display.');
    }
}

function executeTask() {
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
    .then(response => response.json())
    .then(data  => {
        if (!data.success) {
            throw new Error('Network response was not ok');
        }
        console.log(response);
        generateReport(data.reportData); // 直接将数据传递给generateReport函数
        enableReportButton();
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

function enableReportButton() {
    document.getElementById('generateReportBtn').disabled = false;
}


