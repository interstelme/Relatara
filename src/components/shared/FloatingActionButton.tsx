
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  to: string;
  label?: string;
  icon?: React.ReactNode;
}

const FloatingActionButton = ({ 
  to, 
  label = "New Post", 
  icon = <Plus className="h-6 w-6" />
}: FloatingActionButtonProps) => {
  return (
    <Link to={to} className="fixed bottom-6 right-6 z-40">
      <Button 
        className="rounded-full shadow-lg w-14 h-14 p-0 md:w-auto md:h-auto md:px-4 md:py-2"
        size="lg"
      >
        <span className="sr-only md:not-sr-only md:ml-2">{label}</span>
        {icon}
      </Button>
    </Link>
  );
};

export default FloatingActionButton;
