import * as THREE from 'three'
import OrbitControls from '~/assets/js/utils/OrbitControls'
import SimplexNoise from 'simplex-noise'
var simplex = new SimplexNoise()

export default class AMainScene {
  constructor() {
    this.dom = {
      container: document.getElementById('main'),
    }
    if (process.browser) {
      this.width = window.innerWidth
      this.height = window.innerHeight

      this.init()
    }

  }

  addControls = () => {
    this.controls = new OrbitControls(this.camera)
  }

  addBox = () => {


    var geometry = new THREE.PlaneGeometry(50, 100, 50, 50);
    var material = new THREE.MeshLambertMaterial({
      color: 0x45F0DF,
      wireframe: false
    });
    geometry.verticesNeedUpdate = true;
    for (let i = 0; i < geometry.vertices.length; i++) {
      let v = geometry.vertices[i];
      v.z += simplex.noise3D(v.x * 0.1, v.y * 0.125, v.z * 0.125, 0);
    }
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.rotation.x = this.DegToRad(-90)

    //Add scene with mesh and light
    var light = new THREE.PointLight(0x253C78, 1, 0);
    light.position.set(0, 5, 50);
    this.scene.add(light);

    this.scene.add(this.mesh)
  }

  createScene = () => {
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0xefd1b5, 0.0525);

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor(0xffffff, true)

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)

    this.dom.container.appendChild(this.renderer.domElement)
  }

  createCamera = () => {
    const aspectRatio = 30
    const fieldOfView = this.width / this.height
    const nearPlane = 1
    const farPlane = 10000

    this.camera = new THREE.PerspectiveCamera(
      aspectRatio,
      fieldOfView,
      nearPlane,
      farPlane
    )

    this.camera.position.z = 20
    this.camera.position.y = 2
    this.camera.lookAt(this.scene.position)

    this.scene.add(this.camera)
  }

  init = () => {
    this.addListeners()
    this.createScene()
    this.createCamera()
    this.addBox()
    this.addControls()
    this.animate()
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    this.controls.update()

    this.render()
  }

  render = () => {
    this.renderer.render(this.scene, this.camera)
  }

  addListeners = () => {
    window.addEventListener('resize', this.onWindowResize)
  }

  removeListeners = () => {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  DegToRad = (degrees) => {
    return degrees * Math.PI / 180;
  }
}