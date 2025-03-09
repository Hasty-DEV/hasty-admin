type BadgeProps = {
  variant: 'success' | 'error';
  text: string;
};

const variants = {
  success: 'bg-green-100 text-green-700',
  error: 'bg-red-100 text-red-700',
};

export function Badge({ variant, text }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {text}
    </span>
  );
}
