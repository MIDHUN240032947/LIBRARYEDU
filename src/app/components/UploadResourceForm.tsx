import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export function UploadResourceForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    subject: "",
    description: "",
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.author || !formData.category || !formData.subject || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In a real app, this would upload the file and create the resource
    toast.success("Resource uploaded successfully!");
    
    // Reset form
    setFormData({
      title: "",
      author: "",
      category: "",
      subject: "",
      description: "",
      tags: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter resource title"
            className="mt-1"
          />
        </div>

        {/* Author */}
        <div>
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Enter author name"
            className="mt-1"
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="textbook">Textbook</SelectItem>
              <SelectItem value="research-paper">Research Paper</SelectItem>
              <SelectItem value="study-guide">Study Guide</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Subject */}
        <div>
          <Label htmlFor="subject">Subject *</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g., Physics, Mathematics"
            className="mt-1"
          />
        </div>

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Comma-separated tags"
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter resource description"
            rows={4}
            className="mt-1"
          />
        </div>

        {/* File Upload */}
        <div className="md:col-span-2">
          <Label htmlFor="file">Upload File *</Label>
          <div className="mt-1 flex items-center justify-center w-full">
            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 50MB)</p>
              </div>
              <input id="file" type="file" className="hidden" accept=".pdf,.doc,.docx" />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">
          <Upload className="w-4 h-4 mr-2" />
          Upload Resource
        </Button>
      </div>
    </form>
  );
}
