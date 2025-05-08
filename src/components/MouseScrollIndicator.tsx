export default function MouseScrollIndicator({ hidden = false }: { hidden?: boolean }) {
    return (
      <div className={`mouse${hidden ? ' opacity-0' : ''}`} data-state={hidden ? 'hidden' : undefined} />
    );
  }