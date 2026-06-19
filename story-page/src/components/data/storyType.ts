export type Language = "en" | "hi" | "ml" | "kn" | "te"| "sanskrit" | "marathi";

export type MultiLangText = {
  en: string;
  hi?: string;
  ml?: string;
  kn?: string;
  te?: string;
  marathi?: string;
  sanskrit?:string;
  chinese? :string;
  japanese?: string;
  korean?:string;
  russian?:string;
  arabic?:string;
};

export type StoryBlock =
  | {
      type: "text";
      content: MultiLangText;
      music?: string;
    }
  | {
      type: "image";
      src: string;
      caption?: MultiLangText;
      music?: string;
    }
  | {
      type: "video";
      src: string;
      caption?: MultiLangText;
      music?: string;
    };
export type Story = {
  id: string;
  title: MultiLangText;
  description?: MultiLangText;
  author: string;
  thumbnail: string;
  createdAt?: string;
  featured?: boolean;
  readTime?: string; // NEW
  blocks: StoryBlock[];
};