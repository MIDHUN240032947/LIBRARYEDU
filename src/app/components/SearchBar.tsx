import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Input
        type="text"
        placeholder="Search for textbooks, research papers, study guides..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 bg-white border-gray-200"
      />
    </div>
  );
}
