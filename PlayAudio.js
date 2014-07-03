		function PlayAudio() {
			var audioElement = document.getElementById('photography_audio');
			console.log("Play Audio Invoked");			
			audioElement.play();
		};
		function PauseAudio() {
			var audioElement = document.getElementById('photography_audio');
			console.log("Pause Audio Invoked");
			audioElement.pause();
			audioElement.currentTime = 1;
		};