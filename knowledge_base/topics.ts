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
    content: `JavaScript operates on a single-threaded event loop architecture powered by a Call Stack, Web APIs environment, Microtask Queue (Promises, process.nextTick, queueMicrotask), and Macrotask Queue (setTimeout, setInterval, I/O events). Microtasks are processed to completion before the next macrotask is executed.

Closures occur when an inner function retains lexical scope access to variables declared in its enclosing parent scope even after the parent function has completed execution. Key uses include data encapsulation, module patterns, and function currying.

Prototypal Inheritance: Objects inherit properties and methods directly from prototype objects via internal [[Prototype]] link (__proto__). 'async/await' is syntactic sugar over Promises, which wrap asynchronous operations into Pending, Fulfilled, or Rejected states.`,
    keyConcepts: ["Event Loop", "Closures", "Microtasks vs Macrotasks", "Promises", "Async/Await", "Prototypal Inheritance"],
    sampleQuestions: [
      "Explain how the JavaScript Event Loop handles Promises versus setTimeout.",
      "What is a closure in JavaScript and what is a practical use case for it?",
      "What is the difference between shallow copy and deep copy in JS?"
    ]
  },
  {
    id: "react-01",
    topic: "React",
    category: "Frontend Library",
    title: "React Virtual DOM, Reconciliation, Hooks, and State Management",
    content: `React utilizes a Virtual DOM (VDOM) to optimize UI updates. When state or props change, React constructs a new VDOM tree and executes its Fiber Reconciliation Algorithm (diffing algorithm with O(n) complexity using key heuristics) to calculate minimum DOM mutations required.

React Hooks (useState, useEffect, useMemo, useCallback, useRef, useReducer) allow functional components to manage state and side effects. 'useMemo' caches computed scalar or object values across renders, whereas 'useCallback' caches function references to prevent unnecessary child re-renders.

State Management Patterns: Component state, Context API (for global dependency injection), and external state stores like Redux Toolkit or Zustand. Server State management tools (TanStack Query/SWR) handle caching, deduplication, and background refetching.`,
    keyConcepts: ["Virtual DOM", "Fiber Reconciliation", "React Hooks", "useMemo & useCallback", "Context API", "Render Lifecycle"],
    sampleQuestions: [
      "How does the React Fiber reconciliation algorithm optimize rendering performance?",
      "When should you use useCallback versus useMemo?",
      "What causes unnecessary re-renders in React and how do you prevent them?"
    ]
  },
  {
    id: "node-01",
    topic: "Node.js",
    category: "Backend Runtime",
    title: "Node.js Architecture, Libuv Event Loop, Streams, and Clustering",
    content: `Node.js is an asynchronous, event-driven JavaScript runtime powered by Google Chrome's V8 engine and libuv library. Libuv provides a cross-platform thread pool (default 4 threads) for heavy asynchronous operations like disk I/O, DNS resolution, and crypto functions.

Streams (Readable, Writable, Transform, Duplex) enable memory-efficient processing of continuous data chunks without loading full payloads into RAM. Piped streams automatically apply backpressure to prevent downstream buffer overflow.

Process Clustering: The Node.js 'cluster' module enables multi-core scale by spawning master-worker worker processes sharing identical server ports via round-robin IPC load distribution.`,
    keyConcepts: ["Libuv Thread Pool", "Non-blocking I/O", "Node Streams & Backpressure", "EventEmitter", "Process Cluster Mode"],
    sampleQuestions: [
      "How does Node.js handle CPU-intensive tasks without blocking the main event loop?",
      "What are Streams in Node.js and why are they crucial for large file processing?",
      "Explain the phases of the libuv event loop in Node.js."
    ]
  },
  {
    id: "python-01",
    topic: "Python",
    category: "Language Core",
    title: "Python Memory Management, GIL, Decorators, and Asyncio",
    content: `Python manages memory using reference counting and a generational garbage collector that detects cyclic object references. The Global Interpreter Lock (GIL) is a mutual exclusion lock in CPython that prevents multi-threaded Python bytecode execution on multiple CPU cores simultaneously.

Decorators are higher-order functions that modify or extend the behavior of another function without mutating its implementation. Generators use the 'yield' keyword to produce lazy iterators that consume O(1) memory during iteration.

Asyncio: Python's 'asyncio' library provides single-threaded event loop concurrency using coroutines (async def / await) for high-performance I/O-bound networking operations.`,
    keyConcepts: ["GIL (Global Interpreter Lock)", "Generational Garbage Collection", "Decorators", "Generators & Yield", "Asyncio Coroutines"],
    sampleQuestions: [
      "What is the GIL in Python and how does it impact multi-threading versus multi-processing?",
      "How do Python generators optimize memory usage when handling large datasets?",
      "Write and explain a custom Python decorator for measuring function execution time."
    ]
  },
  {
    id: "java-01",
    topic: "Java",
    category: "Language Core",
    title: "Java JVM Architecture, Memory Model, Garbage Collection, and Concurrency",
    content: `The Java Virtual Machine (JVM) consists of Class Loader, JVM Memory (Heap, Metaspace, Stack, Native Method Stack), and Execution Engine (JIT Compiler and Garbage Collector). The Heap is split into Young Generation (Eden, Survivor spaces S0/S1) and Old (Tenured) Generation.

Garbage Collectors (G1GC, ZGC, Parallel GC) reclaim unreferenced heap memory using Mark-Sweep-Compact algorithms. ZGC provides ultra-low sub-millisecond pause times for terabyte-scale heaps.

Concurrency: Java provides synchronization locks (synchronized, ReentrantLock), atomic variables (AtomicInteger), thread pools (ExecutorService), and CompletableFuture for non-blocking asynchronous pipeline execution. Virtual Threads (Project Loom) bring lightweight fibers to Java.`,
    keyConcepts: ["JVM Memory Structure", "Young vs Old Generation Heap", "G1GC & ZGC Algorithms", "JIT Compiler", "Java Concurrency & Virtual Threads"],
    sampleQuestions: [
      "Describe the JVM memory areas and how objects transition from Eden to Old Generation.",
      "What is the difference between synchronized blocks and ReentrantLock in Java?",
      "How do Java Virtual Threads (Project Loom) differ from platform threads?"
    ]
  },
  {
    id: "mongodb-01",
    topic: "MongoDB",
    category: "NoSQL Database",
    title: "MongoDB Document Schema, Indexing, Aggregation Framework, and Sharding",
    content: `MongoDB is a document-oriented NoSQL database storing JSON-like BSON (Binary JSON) documents. It supports dynamic schemas, nested arrays, and embedded subdocuments.

Indexing: B-tree indexes speed up query performance. Index types include Single Field, Compound (obeying prefix rules), Text, Geospatial, Partial, and TTL (Time-To-Live) indexes. Compound indexes should follow the ESR Rule: Equality, Sort, Range.

Aggregation Pipeline: Consists of multistage processing pipelines using operators like $match, $group, $project, $lookup (left outer join), $unwind, and $facet for data transformation.

High Availability & Scalability: Replica Sets provide automatic failover and master-slave primary-secondary replication. Sharding uses a shard key to horizontally partition database collections across cluster nodes.`,
    keyConcepts: ["BSON Documents", "ESR Indexing Rule", "Aggregation Framework ($lookup, $group)", "Replica Sets", "Sharding & Shard Keys"],
    sampleQuestions: [
      "Explain the ESR (Equality, Sort, Range) rule for designing compound MongoDB indexes.",
      "How does the MongoDB Aggregation Pipeline process complex analytical data?",
      "What is the difference between embedding documents and referencing documents in MongoDB schema design?"
    ]
  },
  {
    id: "sql-01",
    topic: "SQL",
    category: "Relational Database",
    title: "Relational Databases, ACID Properties, Normalization, and Query Tuning",
    content: `Relational Database Management Systems (RDBMS like PostgreSQL, MySQL) store structured data in tables governed by schemas and foreign keys.

ACID Properties guarantee transaction reliability: Atomicity (all or nothing), Consistency (valid state constraints), Isolation (transaction concurrency levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable), and Durability (persisted committed writes).

Normalization (1NF, 2NF, 3NF, BCNF) eliminates data redundancy and update anomalies. Denormalization is selectively applied to improve read speeds.

Query Optimization: Indexing (B-Tree, Hash, GIN), analyzing execution plans (EXPLAIN ANALYZE), avoiding SELECT *, optimizing JOIN operations (Nested Loop, Hash Join, Merge Join), and window functions (ROW_NUMBER, RANK, DENSE_RANK).`,
    keyConcepts: ["ACID Properties", "Isolation Levels", "Database Normalization (1NF-3NF)", "B-Tree Indexes", "Execution Plans & EXPLAIN ANALYZE"],
    sampleQuestions: [
      "Explain the four SQL isolation levels and the anomalies (Dirty Read, Non-repeatable Read, Phantom Read) they prevent.",
      "What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK() window functions?",
      "How do B-Tree indexes accelerate SELECT queries and impact INSERT/UPDATE operations?"
    ]
  },
  {
    id: "system-design-01",
    topic: "System Design",
    category: "Architecture",
    title: "Scalable System Architecture, Load Balancing, Caching, and Microservices",
    content: `System Design balances Scalability, Availability, Reliability, and Maintainability.

Scalability: Horizontal Scaling (adding servers behind Load Balancers like NGINX, HAProxy, AWS ALB) vs Vertical Scaling. CAP Theorem states a distributed system can simultaneously provide at most two of three guarantees: Consistency, Availability, and Partition Tolerance.

Caching: Application-level caching (Redis, Memcached) accelerates read performance. Cache strategies include Cache-Aside (Lazy Loading), Write-Through, Write-Behind, and Refresh-Ahead. Cache invalidation strategies: TTL, LRU (Least Recently Used), LFU.

Database Scaling: Database Read Replicas, Connection Pooling, Partitioning/Sharding, and Distributed Transactions (Saga Pattern vs 2-Phase Commit). Async Messaging: Event-driven queues (Kafka, RabbitMQ) for decoupling microservices and smoothing burst traffic.`,
    keyConcepts: ["CAP Theorem", "Load Balancing Strategies", "Redis Caching Patterns (Cache-Aside, Write-Through)", "Database Sharding & Read Replicas", "Saga Pattern & Event Queues"],
    sampleQuestions: [
      "Design a scalable URL shortening service (like Bitly) handling 100M daily active users.",
      "How does the CAP theorem apply when choosing between MongoDB and Cassandra?",
      "Explain the Cache-Aside pattern and how to prevent Cache Stampede (Thundering Herd problem)."
    ]
  },
  {
    id: "aws-01",
    topic: "AWS",
    category: "Cloud Infrastructure",
    title: "Amazon Web Services Architecture, Serverless, IAM, and Networking",
    content: `AWS provides comprehensive cloud compute, storage, and serverless platforms.

Core Compute: EC2 (virtual instances), ECS/EKS (container orchestration), and AWS Lambda (event-driven serverless FaaS with automatic execution scaling and execution time limits).

Networking & Security: VPC (Virtual Private Cloud), Public/Private Subnets, Internet Gateways, NAT Gateways, Security Groups (stateful firewall), and Network ACLs (stateless). AWS IAM (Identity and Access Management) implements Principle of Least Privilege using Roles, Policies, and Users.

Storage & Managed Databases: S3 (Object storage with bucket policies and lifecycle rules), DynamoDB (managed NoSQL), Aurora (high-performance relational DB), CloudFront (CDN content delivery), and SQS/SNS (decoupled messaging queues).`,
    keyConcepts: ["AWS Lambda & Serverless FaaS", "VPC, Security Groups & NAT Gateways", "IAM Roles & Least Privilege", "S3 Object Storage", "CloudFront CDN"],
    sampleQuestions: [
      "What is the difference between Security Groups and Network ACLs in AWS VPC?",
      "How do AWS Lambda cold starts occur and how do you mitigate them?",
      "How would you design a secure, highly available 3-tier web application architecture on AWS?"
    ]
  },
  {
    id: "docker-01",
    topic: "Docker",
    category: "Containerization",
    title: "Docker Containerization, Image Optimization, Networking, and Compose",
    content: `Docker packages applications and dependencies into isolated container images, guaranteeing consistent execution across environments. Unlike VMs that virtualize hardware and run guest OSs, Docker containers share the host kernel using Linux kernel namespaces (for process/network isolation) and cgroups (control groups for resource limits like CPU/RAM).

Dockerfile Best Practices: Multi-stage builds dramatically reduce final image size by discarding build toolchains. Minimize image layers by chaining RUN commands, use official lightweight base images (Alpine/Distroless), and avoid running as root user.

Docker Networking & Volumes: Bridge networks enable container communication on a host. Named Volumes persist container data beyond lifecycle termination. Docker Compose orchestrates multi-container local stack applications via YAML specifications.`,
    keyConcepts: ["Namespaces & Cgroups", "Multi-stage Docker Builds", "Containers vs Virtual Machines", "Docker Volumes & Persistence", "Docker Compose Orchestration"],
    sampleQuestions: [
      "What is the underlying difference between Docker containers and Virtual Machines?",
      "How do multi-stage Docker builds optimize image security and size?",
      "Explain Docker layer caching and how ordering Dockerfile commands affects build speed."
    ]
  },
  {
    id: "kubernetes-01",
    topic: "Kubernetes",
    category: "Container Orchestration",
    title: "Kubernetes Architecture, Workloads, Networking, and Ingress",
    content: `Kubernetes (K8s) automates deployment, scaling, and management of containerized workloads.

Architecture: Control Plane (kube-apiserver, etcd distributed key-value store, kube-scheduler, kube-controller-manager) and Worker Nodes (kubelet, kube-proxy, Container Runtime).

Workload Resources: Pods (smallest deployable unit containing 1+ containers sharing IPC/network), Deployments (declarative state management with zero-downtime rolling updates), StatefulSets (for stateful databases), DaemonSets (runs pod per node), and Jobs/CronJobs.

Services & Networking: ClusterIP (internal IP), NodePort, and LoadBalancer expose pods. Ingress Controllers manage layer 7 HTTP/HTTPS traffic routing, SSL termination, and host-based subdomains. Horizontal Pod Autoscaler (HPA) auto-scales pod count based on CPU/RAM metrics.`,
    keyConcepts: ["Control Plane & Worker Architecture", "Pods, Deployments & StatefulSets", "Services (ClusterIP, NodePort, LoadBalancer)", "Ingress Controllers", "Horizontal Pod Autoscaler (HPA)"],
    sampleQuestions: [
      "Describe the role of etcd in the Kubernetes Control Plane.",
      "How does a Kubernetes Deployment execute a zero-downtime rolling update?",
      "What is the difference between Deployment and StatefulSet in Kubernetes?"
    ]
  },
  {
    id: "ml-01",
    topic: "Machine Learning",
    category: "Artificial Intelligence",
    title: "Machine Learning Foundations, Supervised vs Unsupervised, Evaluation, and Optimization",
    content: `Machine Learning algorithms discover patterns in data to make predictions or decisions without explicit programming.

Learning Paradigms: Supervised Learning (Regression for continuous values, Classification for discrete labels using Logistic Regression, Random Forest, XGBoost), Unsupervised Learning (Clustering via K-Means, DBSCAN; Dimensionality Reduction via PCA), and Reinforcement Learning (reward optimization).

Model Evaluation: Confusion Matrix metrics: Accuracy, Precision (TP / (TP+FP)), Recall/Sensitivity (TP / (TP+FN)), F1-Score (harmonic mean of Precision & Recall), ROC-AUC curve. Bias-Variance Tradeoff: High bias causes underfitting; high variance causes overfitting.

Optimization: Gradient Descent (SGD, Adam optimizer) updates model weights by minimizing loss functions (Cross-Entropy Loss, Mean Squared Error). Cross-Validation (K-Fold) validates model generalization.`,
    keyConcepts: ["Supervised vs Unsupervised Learning", "Precision, Recall & F1-Score", "Bias-Variance Tradeoff", "Gradient Descent & Adam Optimizer", "Overfitting & Regularization (L1/L2)"],
    sampleQuestions: [
      "Explain the Bias-Variance Tradeoff and how regularization techniques (L1 Lasso, L2 Ridge) mitigate overfitting.",
      "When should you optimize for Precision versus Recall in a classification task?",
      "How does the Adam optimizer improve standard Stochastic Gradient Descent?"
    ]
  },
  {
    id: "nlp-01",
    topic: "NLP",
    category: "AI & Data Science",
    title: "Natural Language Processing, Text Preprocessing, TF-IDF, Word Embeddings, and Transformers",
    content: `Natural Language Processing (NLP) bridges computational linguistics and machine learning to understand human text.

Traditional NLP Pipeline: Text Tokenization, Stopword Removal, Stemming (Porter), Lemmatization (WordNet), Part-of-Speech (POS) Tagging, and Named Entity Recognition (NER).

Vectorization: Bag of Words (BoW), TF-IDF (Term Frequency-Inverse Document Frequency weighing unique informative words), and Dense Word Embeddings (Word2Vec, GloVe, FastText) mapping words into continuous semantic vector space where distance represents semantic similarity.

Transformers & Self-Attention: Introduced in "Attention Is All You Need" (Vaswani et al.), Transformers replace sequential RNNs/LSTMs with parallelizable Self-Attention mechanisms ($Attention(Q,K,V) = softmax(QK^T / \sqrt{d_k})V$). BERT (bidirectional encoder) powers masked language modeling and classification tasks.`,
    keyConcepts: ["TF-IDF & Tokenization", "Dense Word Embeddings (Word2Vec)", "Self-Attention Mechanism", "Transformer Encoder vs Decoder", "BERT & Bidirectional Context"],
    sampleQuestions: [
      "How does TF-IDF score word importance across a document corpus?",
      "Explain the mathematical formulation of Self-Attention ($Attention(Q,K,V)$) in Transformers.",
      "What is the fundamental architectural difference between BERT and GPT models?"
    ]
  },
  {
    id: "llms-01",
    topic: "LLMs",
    category: "Generative AI",
    title: "Large Language Models, Architecture, Tokenization, Prompt Engineering, and Alignment",
    content: `Large Language Models (LLMs like GPT-4, Llama 3, Claude 3) are massive auto-regressive Transformer models trained on trillions of tokens to predict next tokens via causal language modeling.

Tokenization: Subword tokenizers (Byte-Pair Encoding / BPE, WordPiece) break text into token IDs. Context Window size defines max token capacity for prompt + response context.

Prompt Engineering Techniques: Zero-Shot, Few-Shot In-Context Learning, Chain-of-Thought (CoT) reasoning ("Let's think step-by-step"), ReAct (Reasoning + Acting), System Instructions, and Structured Output Schema Enforcement (JSON Mode).

Fine-Tuning & Alignment: RLHF (Reinforcement Learning from Human Feedback) and DPO (Direct Preference Optimization) align model behavior with human preferences. Parameter-Efficient Fine-Tuning (PEFT / LoRA) freezes base model weights and trains low-rank adaptation matrices to minimize memory requirements.`,
    keyConcepts: ["Auto-regressive Next Token Prediction", "Byte-Pair Encoding (BPE)", "Chain-of-Thought (CoT) Prompting", "JSON Mode & Structured Prompts", "LoRA Fine-Tuning & RLHF Alignment"],
    sampleQuestions: [
      "How does Low-Rank Adaptation (LoRA) enable parameter-efficient fine-tuning of large LLMs?",
      "What is Chain-of-Thought (CoT) prompting and why does it improve LLM multi-step reasoning?",
      "How do structured outputs (JSON Mode) prevent hallucinated response formats in production APIs?"
    ]
  },
  {
    id: "rag-01",
    topic: "RAG",
    category: "Generative AI System",
    title: "Retrieval-Augmented Generation Architecture, Vector Search, and Context Injection",
    content: `Retrieval-Augmented Generation (RAG) grounds LLM outputs in verified external enterprise data without retraining models, eliminating hallucinations and enabling real-time knowledge integration.

RAG Pipeline Stages:
1. Ingestion & Document Processing: Parsing PDFs/HTML, Text Cleaning, Chunking (Fixed-size with overlap, Semantic chunking, Sentence splitting).
2. Embedding Generation: Generating vector representations via embedding models (text-embedding-3-small, BGE, E5).
3. Indexing & Vector Database: Storing vectors in databases (Pinecone, Qdrant, Milvus, pgvector) using Approximate Nearest Neighbor (ANN) indexes (HNSW, IVF-Flat) with Cosine Similarity or Dot Product metrics.
4. Retrieval: Query embedding vector search, Hybrid Search (combining Dense Vector similarity + Sparse BM25 keyword matching), Reciprocal Rank Fusion (RRF), and Re-ranking (using Cross-Encoders).
5. Context Synthesis & Generation: Injecting top-k retrieved document chunks into LLM prompt context window with strict system rules ("Answer ONLY using retrieved context").`,
    keyConcepts: ["Document Chunking & Overlap", "Dense Embeddings & Vector Databases", "Cosine Similarity & HNSW Indexes", "Hybrid Search (Dense + BM25)", "Context Window Grounding & Source Citations"],
    sampleQuestions: [
      "Explain the step-by-step flow of a RAG pipeline from query to augmented response.",
      "What is Hybrid Search in RAG and why is combining BM25 keyword search with vector embeddings superior?",
      "How do you resolve context retrieval failure modes (e.g. chunk size too small vs lost in the middle phenomenon)?"
    ]
  },
  {
    id: "langchain-01",
    topic: "LangChain",
    category: "AI Framework",
    title: "LangChain & LlamaIndex AI Orchestration Frameworks, Agents, and Tools",
    content: `LangChain and LlamaIndex are open-source frameworks for developing applications powered by language models.

Core Building Blocks:
- PromptTemplates & OutputParsers: Formatting prompts and parsing raw LLM string output into validated Pydantic models or JSON structures.
- Chains (LCEL - LangChain Expression Language): Declarative piping syntax (\`prompt | llm | parser\`) enabling composition, streaming, and async invocation.
- Memory: VectorStoreRetrieverMemory, ConversationBufferMemory, and SummaryMemory for tracking conversation history.
- Agents & Tools: ReAct (Reasoning + Acting) loop where the LLM dynamically selects tools (Web Search, SQL Executer, Calculator, Code Interpreter) based on user goal inputs.

LlamaIndex Specialization: Optimized specifically for data indexing, document connectors (RAG pipelines), query engines, and structured metadata extraction.`,
    keyConcepts: ["LCEL (LangChain Expression Language)", "Output Parsers & Structured JSON", "ReAct Agent Loop", "Tools & Function Calling", "LlamaIndex Data Connectors"],
    sampleQuestions: [
      "How does the ReAct agent framework enable LLMs to execute external tools sequentially?",
      "What are the benefits of using LCEL (LangChain Expression Language) over custom procedural code?",
      "Compare LangChain and LlamaIndex use cases in building AI applications."
    ]
  }
];
