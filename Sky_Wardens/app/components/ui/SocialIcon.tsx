import type { SocialIcon as SocialIconName } from "@/app/config/navigation";

interface SocialIconProps {
  name: SocialIconName;
  className?: string;
}

const paths: Record<SocialIconName, React.ReactNode> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.5 8.5h2V5.5h-2.3C11.9 5.5 11 7 11 8.9V10.5H9v3h2V21h3v-7.5h2.3l.5-3H14v-1.4c0-.4.2-.6.5-.6z" />
  ),
  linkedin: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
      <line x1="7" y1="10" x2="7" y2="17" />
      <circle cx="7" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11 17v-4a2.2 2.2 0 0 1 4.4 0v4M11 10.2V17" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.3v5.4l4.8-2.7z" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function SocialIcon({ name, className }: SocialIconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
