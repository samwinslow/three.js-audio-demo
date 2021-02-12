import * as THREE from 'three'
import * as Tone from 'tone'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls'
import { majorScales } from './noteDefs'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const synth = new Tone.PolySynth().toDestination() // Optionally pass synths to PolySynth()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial()

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 2
let currentScale = majorScales['Ab']
let currentNote = currentScale[0]
let currentOctave = 4, octaveFlex = 0
let enableRotation = true

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}
const onDocumentMouseMove = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
  mouse.x = (clientX / window.innerWidth) * 2 - 1
  mouse.y = -(clientY / window.innerHeight) * 2 + 1
}
const onDomClick = () => {
  console.log('domClick')
  synth.triggerAttackRelease([
    currentNote + currentOctave,
    currentNote + (currentOctave + octaveFlex)
  ], '8n')
}
const onKeyDown = ({ key: _key, shiftKey }) => {
  console.log('keyDown')
  octaveFlex = shiftKey ? 1 : 0
}
const onKeyUp = () => {
  console.log('keyUp')
  octaveFlex = 0
}
window.addEventListener('resize', onWindowResize, false)
document.addEventListener('mousemove', onDocumentMouseMove, false)
renderer.domElement.addEventListener('click', onDomClick, false)
window.addEventListener('keydown', onKeyDown, false)
window.addEventListener('keyup', onKeyUp, false)

const animate = () => {
  requestAnimationFrame(animate)

  if (enableRotation) {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }

  controls.update()
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObject(cube)
  if (intersects.length > 0) {
    const { distance, face, object } = intersects[0] || {}
    const { materialIndex } = face || {}
    currentNote = currentScale[materialIndex]
  }
  render()
}

const render = () => {
  renderer.render(scene, camera)
}
animate()
