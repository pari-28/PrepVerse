export interface InterviewQuestion {
  id: string;
  category: string; // 'HR' | 'OS' | 'DBMS' | 'CN' | 'OOP' | 'Java' | 'Python' | 'JavaScript' | 'React' | 'Node' | 'SQL'
  question: string;
  answer: string;
  points: string[];
}

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 'hr-1',
    category: 'HR / Behavioral',
    question: 'Tell me about a time you had a major conflict in a team and how you resolved it.',
    answer: 'The interviewer is looking for conflict resolution, collaboration, and structured emotional maturity (using the STAR format). Describe a scenario where a technical debate occurred (e.g. choice of Database or API approach), how you active-listened, weighed the pros/cons objectively, found a compromising path or agreed on a test-driven experiment, and reached a positive project outcome.',
    points: [
      'Keep it professional. Do not blame or talk badly about any teammate.',
      'Show active-listening: make sure the interviewer knows you respected their view.',
      'Show data-driven resolution: discuss how testing, benchmarks, or expert advice resolved the dispute.',
      'Emphasize the successful result and what you learned from the experience.'
    ]
  },
  {
    id: 'os-1',
    category: 'OS (Operating Systems)',
    question: 'Explain Virtual Memory and Paging in Operating Systems.',
    answer: 'Virtual Memory is a memory management technique that allows the execution of processes that might not be entirely in physical memory (RAM). It gives processes the illusion of having a large, contiguous memory space. Paging is the physical implementation of virtual memory. The virtual address space is broken down into fixed-size blocks called pages. Physical memory is broken down into same-sized blocks called frames. A Page Table mapped by the MMU (Memory Management Unit) translates virtual page numbers to physical frame numbers. If a required page is not in RAM, a "Page Fault" is triggered, bringing the page in from the disk.',
    points: [
      'Allows running programs larger than the physical RAM size.',
      'Solves the problem of external fragmentation using fixed-size allocation.',
      'Page Faults are expensive disk operations; reducing them via replacement algorithms (LRU, Optimal) is crucial.'
    ]
  },
  {
    id: 'dbms-1',
    category: 'DBMS',
    question: 'What are the ACID properties in database transaction management?',
    answer: 'ACID properties ensure database reliability and transactional correctness: \n1. **Atomicity**: The "All or Nothing" rule. If any statement within a transaction fails, the entire transaction is rolled back.\n2. **Consistency**: A transaction must transition the database from one valid state to another, maintaining all schema constraints, triggers, and keys.\n3. **Isolation**: Concurrent execution of transactions must leave the database in the same state as if they were executed sequentially. This is managed using transaction isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable).\n4. **Durability**: Once a transaction is committed, its changes are permanently written to non-volatile storage (disk), surviving any system crashes.',
    points: [
      'Atomicity is managed by the transaction log or write-ahead logs (WAL).',
      'Isolation is enforced using locks (Shared, Exclusive) or Multiversion Concurrency Control (MVCC).',
      'Mention standard relational databases like PostgreSQL enforce ACID by default.'
    ]
  },
  {
    id: 'cn-1',
    category: 'CN (Computer Networks)',
    question: 'Describe what happens step-by-step when you type https://google.com in a web browser.',
    answer: '1. **DNS Lookup**: The browser checks its cache, OS cache, router cache, or queries ISP Resolver to translate "google.com" to an IP address.\n2. **TCP Connection**: The client initiates a TCP 3-way handshake (SYN, SYN-ACK, ACK) with Google\'s server.\n3. **TLS/SSL Handshake**: Since it is HTTPS, a TLS handshake is performed to exchange keys, authenticate the server\'s digital certificate, and establish an encrypted session.\n4. **HTTP Request**: The browser sends an encrypted GET request for the home page.\n5. **Server Processing**: Google\'s web server/load balancer routes the request, retrieves assets, and returns an HTTP Response (usually 200 OK with HTML/CSS/JS).\n6. **Rendering**: The browser parses HTML (DOM tree), CSS (CSSOM tree), executes JavaScript, and renders the webpage.',
    points: [
      'Explain the transition from domain name to IP using hierarchical DNS servers (Root, TLD, Authoritative).',
      'Highlight how the TLS handshake establishes symmetric encryption keys safely.',
      'Show understanding of the full OSI stack layers involved (Application HTTP, Transport TCP, Network IP, Link Ethernet/Wifi).'
    ]
  },
  {
    id: 'oop-1',
    category: 'OOP (Object Oriented Programming)',
    question: 'Explain the four core principles of Object-Oriented Programming with practical examples.',
    answer: 'The four pillars of OOP are:\n1. **Encapsulation**: Bundling the data (fields) and code (methods) operating on them within a single unit (class), restricting direct access to object variables using access specifiers (private, protected, public) and getter/setter functions.\n2. **Abstraction**: Hiding low-level implementation details and exposing only the essential features of an object. This is implemented via abstract classes and interfaces.\n3. **Inheritance**: The mechanism where a new class (subclass) derives fields and methods from an existing class (superclass), promoting code reusability.\n4. **Polymorphism**: The ability of a message or method to be processed in more than one form. It can be compile-time (method overloading) or runtime (method overriding, virtual functions).',
    points: [
      'Encapsulation prevents direct state corruption.',
      'Abstraction simplifies user interaction (e.g., calling startEngine() on a Car without knowing thermal physics).',
      'Polymorphism promotes writing highly flexible, interchangeable modules (e.g. a Shape interface supporting draw() for Circle, Square, and Triangle classes).'
    ]
  },
  {
    id: 'js-1',
    category: 'JavaScript & React',
    question: 'What is the difference between Virtual DOM and Shadow DOM, and how does React use Fiber?',
    answer: 'The **Virtual DOM** is a lightweight, in-memory representation of the real DOM. React uses it to track state modifications and batch-update the real DOM via a "reconciliation" process. \nThe **Shadow DOM** is a native browser technology used for encapsulation in Web Components, trapping styles and scoping elements so they do not leak out.\n**React Fiber** is the current reconciliation engine introduced in React 16. It enables incremental rendering, allowing React to break rendering work into small chunks, prioritize user interactions (like input typing) over background rendering, and pause or resume work as needed to maintain 60 FPS.',
    points: [
      'Virtual DOM is for framework-level performance optimizations; Shadow DOM is for component isolation.',
      'Fiber is an asynchronous rendering re-architecture, representing work as a singly-linked tree of Fiber nodes.',
      'React 19 further optimizes rendering by auto-memoizing state trees.'
    ]
  }
];
