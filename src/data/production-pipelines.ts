// Project-specific steps rendered with the shared production pipeline layout.
export const productionPipelines = {
  purlieu: [
    { title: 'Character Sculpting', icon: 'box', tools: [{ name: 'ZBrush', icon: 'Zbrush.png' }], note: 'Sculpt the character assets, then retopologize them for deformation and prepare animation-ready UVs.' },
    { title: 'Rigging', icon: 'bone', tools: [{ name: 'Maya / Advanced Skeleton', icon: 'maya.png' }], note: 'Build the character rig with Advanced Skeleton in Maya, preparing animation controls and refining skin weights for reliable deformation.' },
    { title: 'Materials & Texturing', icon: 'paintbrush', tools: [{ name: 'Substance Painter', icon: 'substance.webp' }], note: 'Create texture sets and surface materials in Substance Painter, defining color, roughness and fine detail for the characters and scene assets.' },
    { title: 'Environment & Vegetation', icon: 'trees', tools: [{ name: 'Maya', icon: 'maya.png' }], note: 'Build modular environment assets and distribute vegetation through particle instancing, controlling density, species variation and flow across the terrain.' },
    { title: 'Hair Grooming', icon: 'wind', tools: [{ name: 'Maya / XGen', icon: 'maya.png' }], note: 'Create guide-based hair grooms with expression-driven modifiers for subtle secondary motion.' },
    { title: 'Cloth Simulation', icon: 'shirt', tools: [{ name: 'Marvelous Designer', icon: 'Marvelous.png' }, { name: 'Maya', icon: 'maya.png' }], note: 'Create and simulate garments in Marvelous Designer, then integrate them with the character animation in Maya. Refine collisions and prepare simulation caches for rendering.' },
    { title: 'Lighting & Rendering', icon: 'lightbulb', tools: [{ name: 'Maya', icon: 'maya.png' }], note: 'Bring layout, character animation, vegetation and simulation caches together, then refine lighting and render the final cinematic shots.' },
    { title: 'Compositing', icon: 'layers', tools: [{ name: 'Nuke', icon: 'nuke.jpg' }], note: 'Combine render passes, balance color and contrast, and refine atmosphere to bring the final shots into a consistent cinematic sequence.' },
  ],
  phoenix: [
    { title: 'Flow Guides', icon: 'spline', tools: [], note: 'Sketch circular flight paths and directional curves to establish the flow around the sculptural form.' },
    { title: 'Velocity Field', icon: 'wind', tools: [], note: 'Develop the guides into a velocity field in Houdini. Use VEX to refine direction, noise, falloff and turbulence across the surface.' },
    { title: 'Particle Source', icon: 'layers', tools: [], note: 'Convert the sculptural form into a signed distance volume, preparing its mass and silhouette as the source for particle generation.' },
    { title: 'Particle Advection', icon: 'sparkles', tools: [], note: 'Advect particle layers with different lifespans and scales through the field, forming the body, trailing feathers and sparks of the final phoenix.' },
  ],
  'nation-of-speed': [
    { title: 'Hard-Surface Modeling & UVs', icon: 'box', tools: [{ name: 'Maya', icon: 'maya.png' }], note: 'Model vehicles and mechanical components with attention to historical proportions and recognizable details. Unwrap UVs to prepare the assets for texturing.' },
    { title: 'Rigging', icon: 'bone', tools: [{ name: 'Maya', icon: 'maya.png' }], note: 'Build rigs and controls for moving components, preparing the vehicles and mechanical assemblies for animation.' },
    { title: 'Materials & Texturing', icon: 'paintbrush', tools: [{ name: 'Substance Painter', icon: 'substance.webp' }], note: 'Create surface materials and texture sets, defining paint, metal, markings and wear while keeping each asset readable in motion.' },
    { title: 'Real-Time VFX & Animation', icon: 'workflow', tools: [{ name: 'Unreal Engine', icon: 'Unreal.png' }], note: 'Develop real-time effects and animate the sequence, coordinating vehicle movement, mechanical action and camera timing to communicate speed.' },
    { title: 'Lighting & Rendering', icon: 'lightbulb', tools: [{ name: 'Unreal Engine', icon: 'Unreal.png' }], note: 'Refine lighting, reflections and contrast for large-scale projection. Render the approved shots for final compositing.' },
    { title: 'Compositing & Finishing', icon: 'layers', tools: [{ name: 'Nuke', icon: 'nuke.jpg' }, { name: 'After Effects', icon: 'AfterEffects.png' }], note: 'Composite the rendered shots, balance color and contrast, and refine effects and transitions for the final exhibition film.' },
  ],
  'dynamic-mosaic': [
    { title: 'Source Surface', icon: 'box', tools: [], note: 'Begin with a continuous sculptural surface that defines the overall silhouette and spatial boundaries.' },
    { title: 'Surface Fragmentation', icon: 'shapes', tools: [], note: 'Divide the surface into irregular fragments, replacing continuous geometry with a collection of distinct elements.' },
    { title: 'Point Distribution', icon: 'scatter-chart', tools: [], note: 'Use spatial relationships to control the distribution and density of elements across the original form.' },
    { title: 'Mosaic Reconstruction', icon: 'layers', tools: [], note: 'Reassemble the distributed elements into a fragmented digital skin, varying surface rhythms while retaining the sculptural form.' },
  ],
  'digital-embroidery': [
    { title: 'Shape Segmentation', icon: 'shapes', tools: [], note: 'Separate complex forms into directional regions to establish controllable flow across different structural areas.' },
    { title: 'Directional Guide Design', icon: 'spline', tools: [], note: 'Design guide curves to define primary movement, local curvature and structural hierarchy, using radial, layered and spiral organizations.' },
    { title: 'Vector Field Construction', icon: 'workflow', tools: [], note: 'Convert directional guides into continuous vector fields that organize thread movement and local orientation.' },
    { title: 'Procedural Thread Generation', icon: 'wind', tools: [], note: 'Advect curves through directional fields to generate layered thread-like formations across the surface.' },
    { title: 'Surface Reconstruction', icon: 'layers', tools: [], note: 'Reconstruct image-like surfaces through density accumulation, overlap and directional continuity.' },
  ],
  'lu-zuofu': [
    { title: 'Modeling & sculpting', icon: 'box', tools: [{ name: 'Maya', icon: 'maya.png' }, { name: 'ZBrush', icon: 'Zbrush.png' }], note: 'Sculpt detailed hero assets in ZBrush, then refine production topology and prepare shot-ready geometry in Maya.' },
    { title: 'Materials & textures', icon: 'paintbrush', tools: [{ name: 'Substance Painter', icon: 'substance.webp' }, { name: 'Photoshop', icon: 'Photoshop.png' }], note: 'Author PBR texture sets, masks and supporting 2D elements for consistent material response across Maya shots.' },
    { title: 'Procedural systems & FX', icon: 'workflow', tools: [{ name: 'Houdini', icon: 'Houdini.jpg' }, { name: 'Maya', icon: 'maya.png' }], note: 'Build procedural systems, atmosphere and simulation-driven motion in Houdini, iterating within Maya shot contexts.' },
    { title: 'Compositing & finishing', icon: 'layers', tools: [{ name: 'Nuke', icon: 'nuke.jpg' }, { name: 'After Effects', icon: 'AfterEffects.png' }], note: 'Integrate render passes in Nuke and refine depth, atmosphere, color and contrast. Add targeted 2D finishing and timing polish in After Effects.' },
    { title: 'Editing & delivery', icon: 'film', tools: [{ name: 'Premiere', icon: '' }], note: 'Assemble the final sequence in Premiere, lock timing and export delivery-ready outputs.' },
  ],
  huaguang: [
    { title: 'Sculpting', icon: 'box', tools: [{ name: 'ZBrush', icon: 'Zbrush.png' }], note: 'Sculpt hero elements and high-frequency details for key props and set pieces.' },
    { title: 'Materials & textures', icon: 'paintbrush', tools: [{ name: 'Substance', icon: 'substance.webp' }, { name: 'Photoshop', icon: 'Photoshop.png' }], note: 'Author PBR materials and texture sets for consistent real-time lighting. Refine textures, masks and supporting 2D elements in Photoshop.' },
    { title: 'Procedural systems & VFX', icon: 'workflow', tools: [{ name: 'Houdini', icon: 'Houdini.jpg' }], note: 'Build procedural setups, atmosphere, motion systems and simulation-driven passes. Export optimized elements for real-time use.' },
    { title: 'Scene assembly & rendering', icon: 'mountain', tools: [{ name: 'Unreal Engine', icon: 'Unreal.png' }, { name: 'Quixel Bridge', icon: 'Quixelbridge.png' }], note: 'Source environment assets and surface details with Quixel Megascans. Assemble shots in Unreal, iterate lighting and camera timing, and render real-time outputs.' },
    { title: 'Compositing', icon: 'film', tools: [{ name: 'Nuke', icon: 'nuke.jpg' }], note: 'Composite CG shots and integrate render passes. Finalize color and contrast through the Unreal-to-Nuke workflow.' },
  ],
};
