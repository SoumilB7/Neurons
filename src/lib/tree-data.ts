export interface TreeNode {
  id: string;
  label: string;
  description?: string;
  children?: TreeNode[];
}

export const knowledgeTree: TreeNode = {
  id: "root",
  label: "Neurons Lab",
  description: "Understanding brains, networks, and language models",
  children: [
    {
      id: "brain",
      label: "The Brain",
      description: "Biological neural systems",
      children: [
        { id: "neurons-synapses", label: "Neurons & Synapses", description: "The building blocks of thought" },
        { id: "action-potentials", label: "Action Potentials", description: "Electrical signaling in cells" },
        { id: "plasticity", label: "Plasticity", description: "How the brain rewires itself" },
      ],
    },
    {
      id: "neural-networks",
      label: "Neural Networks",
      description: "Computational learning systems",
      children: [
        { id: "perceptron", label: "Perceptron", description: "The simplest neural unit" },
        { id: "activation-functions", label: "Activation Functions", description: "Non-linearity in networks" },
        { id: "backpropagation", label: "Backpropagation", description: "Learning from errors" },
      ],
    },
    {
      id: "transformers",
      label: "Transformers",
      description: "Attention-based architecture",
      children: [
        { id: "attention", label: "Attention", description: "Focusing on what matters" },
        { id: "self-attention", label: "Self-Attention", description: "Relating within a sequence" },
        { id: "positional-encoding", label: "Positional Encoding", description: "Adding order to sets" },
      ],
    },
    {
      id: "language-models",
      label: "Language Models",
      description: "From tokens to understanding",
      children: [
        { id: "tokenization", label: "Tokenization", description: "Breaking text into pieces" },
        { id: "embeddings", label: "Embeddings", description: "Meaning as geometry" },
        { id: "generation", label: "Generation", description: "Predicting the next token" },
      ],
    },
  ],
};
