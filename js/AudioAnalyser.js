var AudioAnalyser = function ( element ) {

	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var context = new AudioContext();

	var analyser = context.createAnalyser();
	analyser.fftSize = 32;
	analyser.connect( context.destination );

	var gain = context.createGain();
	gain.connect( analyser );

	var source = context.createMediaElementSource( element );
	source.connect( gain );

	//

	var frequencyData = new Uint8Array( analyser.frequencyBinCount );

	var debug = false;

	if ( debug ) {

		var canvas = document.createElement( 'canvas' );
		canvas.width = 512;
		canvas.height = 256;
		canvas.style.position = 'absolute';
		canvas.style.top = '0';
		canvas.style.left = '0';
		document.body.appendChild( canvas );

		var context = canvas.getContext( '2d' );

		var barSize = canvas.width / analyser.fftSize;

	}

	return {

		mark: 0,
		getFrequency: function () {

			return frequencyData;

		},
		update: function () {

			analyser.getByteFrequencyData( frequencyData );

			if ( debug ) {

				context.fillStyle = 'blue';
				context.fillRect( 0, 0, canvas.width, canvas.height );

				context.fillStyle = 'red';

				for ( var i = 0; i < frequencyData.length; i ++ ) {

					var frequency = frequencyData[ i ];
					context.fillRect( i * barSize, 256 - frequency, barSize - 1, frequency );

				}

			}

		}

	};

};
