
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Post = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sideA, setSideA] = useState("Me");
  const [sideB, setSideB] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxCharacterCount = 1000;
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content || !sideA || !sideB || !relationshipType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (content.length > maxCharacterCount) {
      toast({
        title: "Content too long",
        description: `Your post exceeds the ${maxCharacterCount} character limit`,
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "Your post has been published",
      });
      
      navigate("/feed");
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Share Your Relationship Dilemma</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>
              Share your situation and get feedback from others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  placeholder="Enter a brief title for your post"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Describe Your Situation</Label>
                  <span className={`text-xs ${
                    content.length > maxCharacterCount ? "text-destructive" : "text-muted-foreground"
                  }`}>
                    {content.length}/{maxCharacterCount}
                  </span>
                </div>
                <Textarea
                  id="content"
                  placeholder="Describe your relationship issue in detail..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sideA">Side A Label</Label>
                  <Input
                    id="sideA"
                    placeholder="e.g., Me"
                    value={sideA}
                    onChange={(e) => setSideA(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sideB">Side B Label</Label>
                  <Input
                    id="sideB"
                    placeholder="e.g., Partner, Friend, Boss"
                    value={sideB}
                    onChange={(e) => setSideB(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="relationshipType">Relationship Type</Label>
                <Select value={relationshipType} onValueChange={setRelationshipType} required>
                  <SelectTrigger id="relationshipType">
                    <SelectValue placeholder="Select relationship type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dating">Dating</SelectItem>
                    <SelectItem value="Marriage">Marriage</SelectItem>
                    <SelectItem value="Friendship">Friendship</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
                <Label htmlFor="anonymous">Post anonymously</Label>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Post;
