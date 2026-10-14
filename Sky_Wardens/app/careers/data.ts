export interface CareerPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
}

export const careerPositions: CareerPosition[] = [
  {
    id: "lead-flight-systems-engineer",
    title: "Lead Flight Systems & Avionics Engineer",
    department: "Aerospace Systems",
    location: "Bengaluru, India (On-site)",
    type: "Full-Time",
    experience: "6–10 Years",
    description:
      "Lead the architecture, hardware-in-the-loop (HIL) integration, and validation of sovereign autonomous flight control units, mission computers, and fly-by-wire telemetry for next-generation aerial defense platforms.",
    responsibilities: [
      "Architect high-integrity fly-by-wire flight control software and redundant telemetry architectures compliant with mission-critical defense standards.",
      "Direct hardware-in-the-loop (HIL) testing, sensor calibration, and optical tracking integration on full-scale flight simulators.",
      "Conduct flight-line software updates and collaborate with instrumentation engineers during live range validation trials.",
      "Lead cross-functional reviews with propulsion, aerodynamics, and structural teams to ensure seamless airframe-avionics cohesion.",
    ],
    requirements: [
      "B.Tech / M.Tech in Aerospace, Electronics, or Avionics Engineering.",
      "Demonstrated experience with embedded C/C++, RTOS, ARINC 429, and MIL-STD-1553 protocols.",
      "Familiarity with autonomous flight guidance laws, inertial navigation systems (INS/GPS), and fail-safe logic.",
    ],
    tags: [
      "Embedded C/C++",
      "MIL-STD-1553",
      "Flight Control Laws",
      "HIL Simulation",
      "ARINC 429",
    ],
  },
  {
    id: "sr-tactical-autonomy-specialist",
    title: "Senior Tactical Autonomy & Edge AI Specialist",
    department: "Defence & Advanced Systems",
    location: "Hyderabad, India (On-site)",
    type: "Full-Time",
    experience: "4–8 Years",
    description:
      "Architect resilient multi-agent swarming algorithms, low-latency computer vision target tracking pipelines, and edge-compute modules engineered for zero-compromise operations in contested electromagnetic theaters.",
    responsibilities: [
      "Design and deploy distributed swarm coordination routines resilient to RF jamming and intermittent satellite connectivity.",
      "Optimize real-time optical/thermal target classification models for ruggedized on-board compute acceleration (CUDA/TensorRT/FPGA).",
      "Implement zero-latency message protocols between airborne surveillance units and mobile tactical ground control nodes.",
      "Conduct rigorous adversarial testing and hardware validation against simulated electronic warfare countermeasures.",
    ],
    requirements: [
      "Degree in Computer Science, Robotics, Electrical Engineering, or related technical discipline.",
      "Hands-on expertise with ROS2, DDS messaging, OpenCV, and deep learning inference optimization on edge GPUs.",
      "Strong background in state estimation, Kalman filtering, and distributed cooperative control algorithms.",
    ],
    tags: [
      "Edge AI / TensorRT",
      "ROS2 / DDS",
      "Sensor Fusion",
      "CUDA / FPGA",
      "Target Acquisition",
    ],
  },
  {
    id: "materials-structural-specialist",
    title: "Materials & Structural Composite Specialist",
    department: "Aerospace & Metallurgy",
    location: "Pune / Bengaluru, India (On-site)",
    type: "Full-Time",
    experience: "5–9 Years",
    description:
      "Direct high-temperature composite synthesis, ballistic ceramic armor matrix engineering, and aerodynamic airframe structural integrity evaluations across extreme acoustic, thermal, and kinetic operating envelopes.",
    responsibilities: [
      "Develop lightweight ceramic-metallic composite matrices tailored for high-threat ballistic stopping power and STANAG protection compliance.",
      "Oversee carbon fiber prepreg layup protocols, automated vacuum bagging, and autoclave curing cycles for primary airframe sub-assemblies.",
      "Perform high-fidelity finite element analysis (FEA) evaluating shock propagation, aero-thermal heating, and acoustic fatigue life.",
      "Establish non-destructive inspection (NDI) standards and ultrasonic scanning workflows for finished composite structures.",
    ],
    requirements: [
      "B.Tech / M.Tech / Ph.D. in Materials Science, Metallurgical Engineering, or Mechanical Engineering.",
      "5+ years of hands-on experience in aerospace composites, armor testing, or high-performance defense metallurgy.",
      "Proficiency with structural FEA software (Abaqus/ANSYS) and standard composite characterization testing (ASTM/MIL standards).",
    ],
    tags: [
      "Composite Prepregs",
      "Autoclave Curing",
      "STANAG Ballistics",
      "FEA Structural Stress",
      "Non-Destructive Testing",
    ],
  },
];
