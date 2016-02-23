var AudioAnalyser = function ( element ) {

	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var context = new AudioContext();

	var analyser = context.createAnalyser();
	analyser.fftSize = 32;
	analyser.connect( context.destination );

	var source = context.createMediaElementSource( element );
	source.connect( analyser );

	//

	var frequencyData = new Uint8Array( analyser.frequencyBinCount );

	var debug = location.search === '?debug';

	if ( debug ) {

		var canvas = document.createElement( 'canvas' );
		canvas.width = 128;
		canvas.height = 64;
		canvas.style.position = 'absolute';
		canvas.style.top = '0';
		canvas.style.left = '0';
		document.body.appendChild( canvas );

		var context = canvas.getContext( '2d' );

		var bar = {
			width: canvas.width / analyser.frequencyBinCount,
			height: canvas.height
		};

	}

	return {

		getFrequency: function () {

			return frequencyData;

		},
		update: function () {

			analyser.getByteFrequencyData( frequencyData );

			if ( debug ) {

				context.fillStyle = 'darkblue';
				context.fillRect( 0, 0, canvas.width, canvas.height );

				context.fillStyle = 'blue';

				for ( var i = 0; i < frequencyData.length; i ++ ) {

					var frequency = frequencyData[ i ];
					context.fillRect( i * bar.width, ( 1 - ( frequency / 256 ) ) * bar.height, bar.width - 1, ( frequency / 256 ) * bar.height );

				}

			}

		}

	};

};
