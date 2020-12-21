import * as THREE from '/build/three.module.js'
import * as Tone from 'tone'
import { OrbitControls } from '/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const synth = new Tone.Synth().toDestination()

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

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}
const onDocumentMouseMove = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
  // event.preventDefault()
  mouse.x = (clientX / window.innerWidth) * 2 - 1
  mouse.y = -(clientY / window.innerHeight) * 2 + 1
}
window.addEventListener('resize', onWindowResize, false)
document.addEventListener('mousemove', onDocumentMouseMove, false)

let intersects = []

const animate = () => {
  requestAnimationFrame(animate)

  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01

  controls.update()
  raycaster.setFromCamera(mouse, camera)
  intersects = raycaster.intersectObject(cube)
  if (intersects.length > 0) {
    const { distance, face, object } = intersects[0] || {}
    const { materialIndex } = face || {}
    synth.triggerAttackRelease('C4', '8n')
  }
  render()
}

const render = () => {
  renderer.render(scene, camera)
}
animate()
