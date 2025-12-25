// projects.js
// Export a simple projects registry used by project.html

export const PROJECTS = {
  "project-a": {
    id: "project-a",
    title: "Project A — Telemetry Pipeline",
    description: "Designed and built a scalable telemetry ingestion pipeline with Node.js, Kafka, and Docker to handle 100k msgs/sec.",
    tech: ["Node.js", "Kafka", "Docker", "Kubernetes"],
    repo: "https://github.com/yourname/project-a",
    // If `url` is provided, the template will redirect to it instead of rendering.
    url: null
  },
  "project-b": {
    id: "project-b",
    title: "Project B — Embedded RTOS System",
    description: "Firmware for a safety-critical embedded controller using FreeRTOS, optimized for low-latency I/O and power efficiency.",
    tech: ["C", "FreeRTOS", "CAN bus"],
    repo: "https://github.com/yourname/project-b",
    url: null
  },
  "project-c": {
    id: "project-c",
    title: "Project C — ML Pipeline",
    description: "End-to-end ML data pipeline for feature extraction and model training with automated CI/CD.",
    tech: ["Python", "TensorFlow", "Airflow"],
    repo: "https://github.com/yourname/project-c",
    url: "https://example.com/project-c-live-demo"
  }
};

export function getProject(id){
  return PROJECTS[id] || null;
}
