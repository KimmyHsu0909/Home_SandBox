# Outline

## Outline 1: Improving User Interaction Experience

### Purpose

In current smart home interaction, LLMs are mainly used to improve user intent understanding, enhance the reliability of device control, and increase device efficiency. Less attention has been paid to using the knowledge capabilities of LLMs to support richer social interaction and emotional care in everyday life. In many cases, personalized understanding of users is still flattened into a simple profile vector.

Can we apply AI Identity design to smart homes, using LLMs' understanding of devices themselves to create more imaginative interactions while balancing device functionality and user care, thereby improving the overall smart home experience?

### Research Gap

Existing LLM-based smart home research mainly addresses "how to better understand and execute user intent," but pays less attention to "what kind of identity a device should adopt when interacting with users."

### What We Aim To Do

We will design and build a smart home interaction prototype based on AI Identity. The system uses LLMs to dynamically integrate device capabilities, home context, user state, and interaction tone into responses and action suggestions with consistent identity traits. This allows us to explore how smart home devices can provide more social, emotional, and creative user experiences while maintaining functional reliability.

### Research Questions

**RQ1:** How should the AI Identity of smart home devices be designed so that the device's functional attributes, home-use scenarios, and users' emotional needs form a consistent and understandable interaction role?

**RQ2:** Compared with traditional command-based or general-assistant-style smart home interaction, can device-based AI Identity improve users' perceived care, trust, engagement, and overall experience without weakening their sense of device controllability and functional reliability?

### Contribution

This work expands the evaluation dimensions of smart home user experience and reveals the design balance between functionality and care.

## Outline 2: Exploring the Creativity of Multi-Agent / Multi-LLM Systems in Complex and Dynamic Real-Life Scenarios

### Purpose

Current multi-agent research often focuses on efficiency, accuracy, executability, and robustness. Meanwhile, research on LLM-based multi-agent systems has begun to address complex problem solving, role collaboration, and world simulation. However, most studies still remain within benchmark tasks, simulated environments, or general collaboration frameworks. They rarely examine whether these agents can generate creative interaction strategies in open-ended, dynamic, and context-rich real home environments.

This study aims to rethink multi-agent systems in smart homes from the perspective of creativity. When different devices are assigned distinct AI Identities, capability boundaries, and contextual perspectives, they do not merely execute user commands. Instead, they can reason around users' life goals, emotional states, environmental changes, and device constraints, generating interactions that are novel, appropriate, and caring.

### Research Gap

Existing research has three main limitations.

First, multi-agent research in smart homes mostly focuses on control, optimization, and adaptive management. These studies often treat the home as a system to be optimized, rather than as a living environment that needs to be jointly understood, interpreted, and creatively responded to.

Second, although LLM-based multi-agent research discusses collaboration, role division, complex problem solving, and simulation, most scenarios still focus on abstract tasks, software development, games, question answering, planning, or social simulation. There is limited attention to creative collaboration in real life. In other words, existing work is more concerned with whether multiple agents can complete a task, and less concerned with whether they can produce contextually appropriate creative solutions beyond what a single assistant can offer.

Third, research on AI creativity usually focuses on text, design, art, or brainstorming tasks. It rarely examines creativity in embodied, device-based, and domestic interaction environments. Creativity in smart homes is not simply about "generating new ideas." It must also satisfy multimodal device capabilities, executability, user preferences, emotional care, safety boundaries, and household constraints. Therefore, there is still a lack of a creativity research framework for multi-agent AI Identity in smart homes.

### What We Aim To Do

We will design and build a smart home interaction prototype based on multi-agent AI Identity. In the system, different smart home devices are assigned distinct identities, capabilities, tones, concerns, and action boundaries. When facing dynamic and complex household scenarios, these agents collaboratively generate creative interactions that serve users' life goals through negotiation, complementarity, conflict resolution, and solution integration.

### Research Questions

**RQ1:** In complex and dynamic smart home scenarios, how do device agents with different AI Identities collaborate and negotiate to generate interaction strategies that are novel, appropriate, and context-sensitive?

**RQ2:** Compared with a single LLM assistant or a traditional rule-based smart home system, can a multi-agent AI Identity system improve users' perceived system creativity, contextual understanding, life support, and interaction richness?

### Contribution

This study proposes a multi-agent creativity perspective for smart home research. It builds a multi-agent smart home prototype based on AI Identity, establishes evaluation dimensions for AI creativity in domestic settings, and reveals the sources and limitations of multi-agent creativity.

## Points

- Place MLLM-based multi-agent systems within smart home scenarios.
- Compare the commonly used central-agent model with an agent-based model for controlling home devices.
- Support multimodal interaction, relying not only on user language but also on observations of user behavior, identity, spatial location, and other contextual cues.
- Include interactions among devices.
- Design identities based on the intrinsic characteristics of each device.
- Design conversations for different individual users.
- Most multi-agent / multi-LLM systems are used to complete a single shared task or operate in scenarios with a relatively simple information flow. In smart homes, however, the challenge is not merely assigning agent identities and tasks. The key question is how agents process information and interact with users in complex real-world environments. The smart home can serve as one scenario, and this capability could later be transferred to other, more complex real-life settings.

## Workflow

- Identify the dimensions from which device identities should be designed, and determine how devices should communicate with each other.
- Explore how to balance device functionality and expressiveness.
- Consider cross-modal design. Interaction does not need to be limited to text; it may include device sounds, expressions, or special responses.
- Device identity does not have to be fixed. Agents can analyze and understand data on their own, dynamically updating their self-understanding of identity. Their identities should also adapt in real time according to environmental data.
- Find a suitable smart home simulator, preferably one that supports 3D construction. If no appropriate sandbox exists, we can build a 2D or 3D environment ourselves. We can then adapt it for the project by introducing more environmental variables, such as temperature, humidity, energy consumption, device usage duration, and users with different identities. The simulator will be used to test our system.
- Identify suitable metrics for evaluating success.

## Simulators

### Kairos

- Paper: <https://arxiv.org/abs/2606.06390>
- Project page: <https://kairos-homeworld.github.io/>
- Notes: It provides 3D scenes with more realistic spatial and physical properties, but does not include many specific environmental variables. The code has not yet been released.

### OpenSHS

### SimuHome

- Repository: <https://github.com/holi-lab/SimuHome>
- Notes: It does not provide 3D scenes and is mainly used to test agent control and reasoning abilities. However, it does include environmental variables.
