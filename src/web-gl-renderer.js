const fieldCanvas = document.getElementById('field')
const gl = fieldCanvas.getContext('webgl')
gl.clearColor(0.21, 0.25, 0.28, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

function webGLRenderer (v) {
  gl.clearColor(0.21, 0.25, 0.28, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  if (v.length > 0) {
    var vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, `
      attribute vec2 position;
      uniform vec2 resolution;
      void main() {
        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = position / resolution;
        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;
        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;
           gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      }`)
    gl.compileShader(vertexShader)

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, `
      precision highp float;
      uniform vec4 color;
      void main() {
        gl_FragColor = color;
      }`)
    gl.compileShader(fragmentShader)

    var program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    var vertices = Float32Array.from(v)

    var buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    gl.useProgram(program)
    program.color = gl.getUniformLocation(program, 'color')
    gl.uniform4fv(program.color, [1, 1, 1, 1.0])

    program.resolution = gl.getUniformLocation(program, 'resolution')
    gl.uniform2f(program.resolution, gl.canvas.width, gl.canvas.height)

    program.position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(program.position)
    gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2)
  }
}

export default webGLRenderer
