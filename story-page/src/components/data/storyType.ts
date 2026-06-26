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
export type SecretLesson = {
  emoji: string;
  text: MultiLangText;
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
    } | {
      type: "secret_lessons";
      meta: {
        title: MultiLangText;
        badge?: MultiLangText;
        intro?: MultiLangText;
      };
      lessons: SecretLesson[];
       music?: string;
    };
    export type Genre = string;
export type StoryCharacter = {
  name: string;
  type: string;
  description: string;
  image?: string; // 👈 character avatar / illustration URL
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
   genre?: Genre[];   // ✅ ADD THIS

  characters?: StoryCharacter[]; // ✅ ADD THIS
};
export type CharacterIntroPage = {
  type: "characters";
  music?: string;
};

export type StoryPage = CharacterIntroPage | StoryBlock;