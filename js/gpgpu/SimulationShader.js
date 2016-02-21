/**
 * @author mrdoob / http://www.mrdoob.com
 */

GPGPU.SimulationShader = function () {

	var material = new THREE.ShaderMaterial( {

		uniforms: {
			tPositions: { type: "t", value: null },
			tOrigins: { type: "t", value: null },
			opacity: { type: "f", value: 0 },
			timer: { type: "f", value: 0 }
		},
		vertexShader: [

			'varying vec2 vUv;',

			'void main() {',
			'	vUv = vec2( uv.x, 1.0 - uv.y );',
			'	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
			'}'

		].join( '\n' ),
		fragmentShader: [

			'uniform float opacity;',

			'uniform sampler2D tPositions;',
			'uniform sampler2D tOrigins;',

			'uniform float timer;',

			'varying vec2 vUv;',

			/*
			'float rand(vec2 co){',
			'    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);',
			'}',
			*/

			'void main() {',

			'	vec4 pos = texture2D( tPositions, vUv );',

			'	if ( pos.w <= 0.0 ) {',

			'		vec4 sample = texture2D( tOrigins, vUv );',
			'		pos.xyz = sample.xyz;',
			'		pos.w = sample.w * opacity;',

			'	} else {',

			'		float x = pos.x + timer * 5.0;',
			'		float y = pos.y;',
			'		float z = pos.z + timer * 4.0;',

			'		pos.x += sin( y * 0.133 ) * cos( z * 0.137 ) * 0.4;',
			'		pos.y += sin( x * 0.135 ) * cos( x * 0.135 ) * 0.4;',
			'		pos.z += sin( x * 0.137 ) * cos( y * 0.133 ) * 0.4;',
			'		pos.w -= 0.01;',

			'	}',

			'	gl_FragColor = pos;',

			'}',

		].join( '\n' )

	} );

	return {

		material: material,

		setPositionsTexture: function ( positions ) {

			material.uniforms.tPositions.value = positions;

			return this;

		},

		setOriginsTexture: function ( origins ) {

			material.uniforms.tOrigins.value = origins;

			return this;

		},

		setOpacity: function ( opacity ) {

			material.uniforms.opacity.value = opacity;

			return this;

		},

		setTimer: function ( timer ) {

			material.uniforms.timer.value = timer;

			return this;

		}

	}

};
