export interface KnowledgeDoc {
  id: string;
  topic: string;
  category: string;
  title: string;
  content: string;
  keyConcepts: string[];
  sampleQuestions: string[];
}

export const KNOWLEDGE_BASE: KnowledgeDoc[] = [
  {
    id: "js-01",
    topic: "JavaScript",
    category: "Language Core",
    title: "JavaScript Event Loop, Closures, and Async Execution",
    content: `JavaScript operates on a single-threaded event loop architecture powered by a Call Stack, Web APIs environment, Microtask Queue (Promises, queueMicrotask), and Macrotask Queue (setTimeout, setInterval). Microtasks are processed to completion before the next macrotask is executed.

Closures occur when an inner function retains lexical scope access to variables declared in its enclosing parent scope even after the parent function has completed execution. Key uses include data encapsulation, module patterns, and function currying.`,
    keyConcepts: ["Event Loop", "Closures", "Microtasks vs Macrotasks", "Promises", "Async/Await"],
    sampleQuestions: [
      "Explain how the JavaScript Event Loop handles Promises versus setTimeout.",
      "What is a closure in JavaScript and what is a practical use case for it?"
    ]
  },
  {
    id: "react-01",
    topic: "React",
    category: "Frontend Library",
    title: "React Virtual DOM, Reconciliation, Hooks, and State Management",
    content: `React utilizes a Virtual DOM (VDOM) to optimize UI updates. When state or props change, React constructs a new VDOM tree and executes its Fiber Reconciliation Algorithm to calculate minimum DOM mutations required.

React Hooks (useState, useEffect, useMemo, useCallback) allow functional components to manage state and side effects. useMemo caches computed values, whereas useCallback caches function references.`,
    keyConcepts: ["Virtual DOM", "Fiber Reconciliation", "React Hooks", "useMemo & useCallback", "Context API"],
    sampleQuestions: [
      "How does the React Fiber reconciliation algorithm optimize rendering performance?",
      "When should you use useCallback versus useMemo?"
    ]
  },
  {
    id: "node-01",
    topic: "Node.js",
    category: "Backend Runtime",
    title: "Node.js Architecture, Libuv Event Loop, Streams, and Clustering",
    content: `Node.js is an asynchronous, event-driven JavaScript runtime powered by Google Chrome's V8 engine and libuv library. Libuv provides a cross-platform thread pool for heavy asynchronous operations like disk I/O, DNS resolution, and crypto functions.

Streams enable memory-efficient processing of continuous data chunks without loading full payloads into RAM. Piped streams automatically apply backpressure to prevent downstream buffer overflow.`,
    keyConcepts: ["Libuv Thread Pool", "Non-blocking I/O", "Node Streams & Backpressure", "Process Cluster Mode"],
    sampleQuestions: [
      "How does Node.js handle CPU-intensive tasks without blocking the main event loop?",
      "What are Streams in Node.js and why are they crucial for large file processing?"
    ]
  },
  {
    id: "python-01",
    topic: "Python",
    category: "Language Core",
    title: "Python Memory Management, GIL, Decorators, and Asyncio",
    content: `Python manages memory using reference counting and a generational garbage collector. The Global Interpreter Lock (GIL) is a mutual exclusion lock in CPython that prevents multi-threaded Python bytecode execution on multiple CPU cores simultaneously.

Decorators are higher-order functions that modify behavior without mutating code. Generators use the 'yield' keyword to produce lazy iterators consuming O(1) memory.`,
    keyConcepts: ["GIL", "Generational Garbage Collection", "Decorators", "Generators & Yield", "Asyncio"],
    sampleQuestions: [
      "What is the GIL in Python and how does it impact multi-threading versus multi-processing?",
      "How do Python generators optimize memory usage when handling large datasets?"
    ]
  },
  {
    id: "mongodb-01",
    topic: "MongoDB",
    category: "NoSQL Database",
    title: "MongoDB Document Schema, Indexing, Aggregation Framework, and Sharding",
    content: `MongoDB is a document-oriented NoSQL database storing JSON-like BSON documents.

Indexing: B-tree indexes speed up query performance. Compound indexes follow the ESR Rule: Equality, Sort, Range.

Aggregation Pipeline: Consists of multistage processing pipelines using operators like $match, $group, $project, $lookup (left outer join), and $unwind.`,
    keyConcepts: ["BSON Documents", "ESR Indexing Rule", "Aggregation Framework", "Replica Sets", "Sharding"],
    sampleQuestions: [
      "Explain the ESR rule for designing compound MongoDB indexes.",
      "How does the MongoDB Aggregation Pipeline process complex analytical data?"
    ]
  },
  {
    id: "sql-01",
    topic: "SQL",
    category: "Relational Database",
    title: "Relational Databases, ACID Properties, Normalization, and Query Tuning",
    content: `Relational Databases (PostgreSQL, MySQL) store structured data governed by schemas and foreign keys.

ACID Properties: Atomicity, Consistency, Isolation (Read Uncommitted, Read Committed, Repeatable Read, Serializable), and Durability.

Normalization (1NF, 2NF, 3NF) eliminates data redundancy. Query tuning uses B-Tree indexes, EXPLAIN ANALYZE execution plans, and optimized JOIN operations.`,
    keyConcepts: ["ACID Properties", "Isolation Levels", "Database Normalization", "B-Tree Indexes", "EXPLAIN ANALYZE"],
    sampleQuestions: [
      "Explain the four SQL isolation levels and the anomalies they prevent.",
      "What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?"
    ]
  },
  {
    id: "system-design-01",
    topic: "System Design",
    category: "Architecture",
    title: "Scalable System Architecture, Load Balancing, Caching, and Microservices",
    content: `System Design balances Scalability, Availability, Reliability, and Maintainability.

CAP Theorem states a distributed system can simultaneously provide at most two of: Consistency, Availability, and Partition Tolerance.

Caching: Application-level caching (Redis, Memcached) accelerates read performance via Cache-Aside, Write-Through, and Write-Behind patterns.`,
    keyConcepts: ["CAP Theorem", "Load Balancing", "Redis Cache-Aside Pattern", "Sharding & Replicas", "Event Queues (Kafka)"],
    sampleQuestions: [
      "Design a scalable URL shortening service handling 100M daily active users.",
      "Explain the Cache-Aside pattern and how to prevent Cache Stampede."
    ]
  },
  {
    id: "aws-01",
    topic: "AWS",
    category: "Cloud Infrastructure",
    title: "Amazon Web Services Architecture, Serverless, IAM, and Networking",
    content: `AWS provides cloud compute, storage, and serverless platforms.

Core Compute: EC2, ECS/EKS, and AWS Lambda (event-driven serverless FaaS with automatic execution scaling).

VPC & Security: Public/Private Subnets, Security Groups (stateful firewall), Network ACLs (stateless), and IAM Roles (Principle of Least Privilege).`,
    keyConcepts: ["AWS Lambda & Serverless", "VPC, Security Groups & NAT Gateways", "IAM Roles & Least Privilege", "S3 & CloudFront"],
    sampleQuestions: [
      "What is the difference between Security Groups and Network ACLs in AWS VPC?",
      "How do AWS Lambda cold starts occur and how do you mitigate them?"
    ]
  },
  {
    id: "docker-01",
    topic: "Docker",
    category: "Containerization",
    title: "Docker Containerization, Image Optimization, Networking, and Compose",
    content: `Docker packages applications into isolated container images sharing the host Linux kernel via namespaces and cgroups.

Multi-stage Docker builds reduce final image size by discarding build toolchains. Docker Compose orchestrates multi-container stacks via YAML specifications.`,
    keyConcepts: ["Namespaces & Cgroups", "Multi-stage Builds", "Containers vs VMs", "Docker Volumes", "Docker Compose"],
    sampleQuestions: [
      "What is the underlying difference between Docker containers and Virtual Machines?",
      "How do multi-stage Docker builds optimize image security and size?"
    ]
  },
  {
    id: "kubernetes-01",
    topic: "Kubernetes",
    category: "Container Orchestration",
    title: "Kubernetes Architecture, Workloads, Networking, and Ingress",
    content: `Kubernetes automates deployment, scaling, and management of containerized workloads.

Architecture: Control Plane (kube-apiserver, etcd key-value store, kube-scheduler, kube-controller-manager) and Worker Nodes.

Resources: Pods, Deployments (rolling updates), StatefulSets (databases), Services (ClusterIP, NodePort, LoadBalancer), and Ingress Controllers.`,
    keyConcepts: ["Control Plane & Worker Nodes", "Pods & Deployments", "Services & Ingress Controllers", "Horizontal Pod Autoscaler"],
    sampleQuestions: [
      "Describe the role of etcd in the Kubernetes Control Plane.",
      "How does a Kubernetes Deployment execute a zero-downtime rolling update?"
    ]
  },
  {
    id: "ml-01",
    topic: "Machine Learning",
    category: "Artificial Intelligence",
    title: "Machine Learning Foundations, Supervised vs Unsupervised, Evaluation",
    content: `Machine Learning algorithms discover patterns in data to make predictions.

Supervised Learning (Regression, Classification) vs Unsupervised Learning (Clustering, Dimensionality Reduction).

Evaluation: Confusion Matrix (Precision, Recall, F1-Score, ROC-AUC). Bias-Variance Tradeoff: High bias causes underfitting; high variance causes overfitting.`,
    keyConcepts: ["Supervised vs Unsupervised", "Precision, Recall & F1-Score", "Bias-Variance Tradeoff", "Gradient Descent"],
    sampleQuestions: [
      "Explain the Bias-Variance Tradeoff and how regularization techniques mitigate overfitting.",
      "When should you optimize for Precision versus Recall?"
    ]
  },
  {
    id: "nlp-01",
    topic: "NLP",
    category: "AI & Data Science",
    title: "Natural Language Processing, Text Preprocessing, TF-IDF, Embeddings, and Transformers",
    content: `Natural Language Processing (NLP) bridges computational linguistics and machine learning.

TF-IDF weights unique informative terms across documents. Word Embeddings (Word2Vec) map words into dense continuous vector space where distance represents semantic similarity.

Transformers & Self-Attention: Replaces sequential RNNs with parallelizable Self-Attention mechanisms ($Attention(Q,K,V)$).`,
    keyConcepts: ["TF-IDF & Tokenization", "Dense Word Embeddings", "Self-Attention Mechanism", "Transformers & BERT"],
    sampleQuestions: [
      "How does TF-IDF score word importance across a document corpus?",
      "Explain the mathematical formulation of Self-Attention in Transformers."
    ]
  },
  {
    id: "llms-01",
    topic: "LLMs",
    category: "Generative AI",
    title: "Large Language Models, Tokenization, Prompt Engineering, and Alignment",
    content: `Large Language Models (GPT-4, Llama 3, Claude 3) are massive auto-regressive Transformer models trained on trillions of tokens to predict next tokens.

Prompt Engineering: Zero-Shot, Few-Shot, Chain-of-Thought (CoT) reasoning, and Structured JSON Mode.

Alignment: RLHF and DPO align behavior with human preferences. LoRA (Low-Rank Adaptation) enables parameter-efficient fine-tuning.`,
    keyConcepts: ["Auto-regressive Next Token Prediction", "Chain-of-Thought Prompting", "JSON Mode", "LoRA Fine-Tuning & RLHF"],
    sampleQuestions: [
      "How does Low-Rank Adaptation (LoRA) enable parameter-efficient fine-tuning?",
      "What is Chain-of-Thought prompting and why does it improve LLM multi-step reasoning?"
    ]
  },
  {
    id: "rag-01",
    topic: "RAG",
    category: "Generative AI System",
    title: "Retrieval-Augmented Generation Architecture, Vector Search, and Context Injection",
    content: `Retrieval-Augmented Generation (RAG) grounds LLM outputs in verified external enterprise data without retraining models, eliminating hallucinations.

Pipeline: Document Ingestion & Chunking -> Vector Embedding Generation -> Vector Indexing (HNSW, Cosine Similarity) -> Context Retrieval -> LLM Grounded Answer Generation with Source Citations.`,
    keyConcepts: ["Document Chunking & Overlap", "Vector Embeddings & Databases", "Cosine Similarity", "Hybrid Search", "Context Window Grounding"],
    sampleQuestions: [
      "Explain the step-by-step flow of a RAG pipeline from query to augmented response.",
      "What is Hybrid Search in RAG and why is combining BM25 keyword search with vector embeddings superior?"
    ]
  },
  {
    id: "langchain-01",
    topic: "LangChain",
    category: "AI Framework",
    title: "LangChain & LlamaIndex AI Orchestration Frameworks, Agents, and Tools",
    content: `LangChain and LlamaIndex are frameworks for building applications powered by language models.

Building Blocks: PromptTemplates, OutputParsers, Chains (LCEL - LangChain Expression Language), Vector Memory, and ReAct Agents that dynamically execute tools.`,
    keyConcepts: ["LCEL Syntax", "Output Parsers & JSON Mode", "ReAct Agent Loop", "Tools & Function Calling"],
    sampleQuestions: [
      "How does the ReAct agent framework enable LLMs to execute external tools sequentially?",
      "Compare LangChain and LlamaIndex use cases in building AI applications."
    ]
  }
];
