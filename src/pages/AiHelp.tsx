
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/components/posts/PostCard";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data
const mockUserPosts: Post[] = [
  {
    id: "user-1",
    authorInfo: {
      gender: "Male",
      ageGroup: "25-34",
      isAnonymous: true,
    },
    title: "Friend borrowed money and won't pay back",
    content: "I lent my friend $500 for an emergency 3 months ago...",
    sideA: "Me",
    sideB: "Friend",
    relationshipType: "Friendship",
    votesA: 83,
    votesB: 17,
    comments: [],
    createdAt: "2025-05-10T10:30:00Z"
  },
  {
    id: "user-2",
    authorInfo: {
      gender: "Male",
      ageGroup: "25-34",
      isAnonymous: false,
    },
    title: "Moving in too soon?",
    content: "My girlfriend wants to move in together after 6 months of dating...",
    sideA: "Me",
    sideB: "Girlfriend",
    relationshipType: "Dating",
    votesA: 65,
    votesB: 35,
    comments: [],
    createdAt: "2025-05-05T09:15:00Z"
  }
];

// Mock AI response
const mockAiAdvice = `
Based on your situation, here's my advice:

1. **Have an honest conversation** about your feelings without accusation. Use "I" statements like "I feel uncomfortable when..." rather than "You always..."

2. **Set clear boundaries** about what you're willing to compromise on and what you're not. This isn't selfish - it's self-respect.

3. **Consider a trial period** where you test the new arrangement for a limited time before making a permanent decision.

4. **Explore compromise solutions** that might partially satisfy both of your needs. Often the best solution isn't all-or-nothing.

5. **Reflect on patterns** in your relationship. Is this a one-time issue or part of a recurring problem?

Remember that healthy relationships involve mutual respect for each other's needs and boundaries. Neither person should feel consistently overlooked or pressured.
`;

const AiHelp = () => {
  const [selectedPost, setSelectedPost] = useState<string>("new");
  const [problem, setProblem] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiAdvice, setAiAdvice] = useState("");
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const { toast } = useToast();
  
  const handleSelectPost = (postId: string) => {
    setSelectedPost(postId);
    if (postId !== "new") {
      const post = mockUserPosts.find(p => p.id === postId);
      if (post) {
        setProblem(post.content);
      }
    } else {
      setProblem("");
    }
    
    // Clear any previous advice
    setAiAdvice("");
  };
  
  const handleGenerateAdvice = async () => {
    if (!problem.trim()) {
      toast({
        title: "Missing description",
        description: "Please describe your relationship problem",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsGenerating(true);
      
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would be an API call to Gemini
      setAiAdvice(mockAiAdvice);
    } catch (error) {
      console.error("Error generating advice:", error);
      toast({
        title: "Error",
        description: "Failed to generate advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Get AI Relationship Advice</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Describe Your Situation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="postSelect">Select a post or create a new query</Label>
                <Select value={selectedPost} onValueChange={handleSelectPost}>
                  <SelectTrigger id="postSelect">
                    <SelectValue placeholder="Select a post or create new" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New question</SelectItem>
                    {mockUserPosts.map(post => (
                      <SelectItem key={post.id} value={post.id}>
                        {post.title || post.content.substring(0, 30) + "..."}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="problem">Describe your relationship issue</Label>
                <Textarea
                  id="problem"
                  placeholder="Explain your relationship situation in detail..."
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
              
              <Button 
                onClick={handleGenerateAdvice}
                disabled={isGenerating || !problem.trim()}
                className="w-full"
              >
                {isGenerating ? "Generating Advice..." : "Get AI Advice"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {isGenerating ? (
          <Card>
            <CardHeader>
              <CardTitle>Generating Advice...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[95%]" />
                <Skeleton className="h-4 w-[85%]" />
              </div>
            </CardContent>
          </Card>
        ) : aiAdvice ? (
          <Card>
            <CardHeader>
              <CardTitle>AI Relationship Advice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert prose-sm md:prose-base max-w-none">
                {aiAdvice.split('\n\n').map((paragraph, i) => (
                  <p key={i} className={i === 0 ? "" : "mt-4"}>
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-6 space-y-3">
                <Label htmlFor="followUp">Ask a follow-up question</Label>
                <Textarea
                  id="followUp"
                  placeholder="Ask for clarification or more specific advice..."
                  value={followUpQuestion}
                  onChange={(e) => setFollowUpQuestion(e.target.value)}
                />
                <Button
                  className="w-full"
                  disabled={!followUpQuestion.trim()}
                >
                  Submit Follow-up Question
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <div className="text-xs text-muted-foreground text-center">
                AI-generated advice should not replace professional therapy or counseling.<br />
                For serious issues, please consult a qualified professional.
              </div>
            </CardFooter>
          </Card>
        ) : null}
      </div>
    </AppLayout>
  );
};

export default AiHelp;
