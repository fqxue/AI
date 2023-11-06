function setLoading(isLoading) {
	document.getElementById('loading').style.display = isLoading ? 'block' : 'none';
	document.getElementById('response').style.display = isLoading ? 'none' : 'block';
}

function sendMessage() {
	var message = document.getElementById('message').value;
	var selectedApi = document.getElementById('apiSelect').value;
	var apiUrl = 'https://api.lolimi.cn/API/AI/';

	// 根据所选API调整URL
	apiUrl += selectedApi === 'xh' ? 'xh.php' : 'wx.php';
	apiUrl += '?msg=' + encodeURIComponent(message);

	if (message) { // 确保消息非空
		// 禁用发送按钮并显示加载提示
		document.getElementById('sendButton').disabled = true;
		setLoading(true);

		// 发送GET请求到API
		fetch(apiUrl)
			.then(response => response.json())
			.then(data => {
				if (data.code === 200) {
					var outputText = data.data.output;
					document.getElementById('response').innerText = `${outputText}`;
				} else {
					document.getElementById('response').textContent = '错误: ' + data.code;
				}
			})
			.catch(error => {
				document.getElementById('response').textContent = '请求出错: ' + error;
			})
			.finally(() => {
				// 启用发送按钮并隐藏加载提示
				document.getElementById('sendButton').disabled = false;
				setLoading(false);
			});
	} else {
		alert('请输入消息。');
	}
}