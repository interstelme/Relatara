
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

// Define the post interface
export interface Post {
  id: string;
  authorInfo: {
    gender?: string;
    ageGroup?: string;
    isAnonymous: boolean;
  };
  title?: string;
  content: string;
  sideA: string;
  sideB: string;
  relationshipType?: string;
  votesA: number;
  votesB: number;
  comments: Comment[];
  createdAt: string;
}

interface Comment {
  id: string;
  authorId: string;
  authorDisplayName: string;
  content: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userVote, setUserVote] = useState<"A" | "B" | null>(null);
  const totalVotes = post.votesA + post.votesB;
  
  const handleVote = (side: "A" | "B") => {
    // In a real app, this would call an API
    setUserVote(side);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // In a real app, this would call an API
    console.log("Adding comment:", newComment);
    setNewComment("");
    // Optimistically add the comment to the UI
    // (In real implementation, would use actual response from API)
  };
  
  return (
    <Card className="mb-6 overflow-hidden glass-card animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="text-sm text-muted-foreground">
            {post.authorInfo.isAnonymous ? (
              <>Anonymous {post.authorInfo.gender || ""}{post.authorInfo.ageGroup ? `, ${post.authorInfo.ageGroup}` : ""}</>
            ) : (
              "User"
            )}
            
            {post.relationshipType && (
              <span className="ml-2 bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-0.5">
                {post.relationshipType}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        {post.title && <h3 className="text-lg font-semibold mt-1">{post.title}</h3>}
      </CardHeader>
      
      <CardContent>
        <p className="text-foreground/90 mb-4">{post.content}</p>
        
        {/* Voting Section */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            onClick={() => handleVote("A")}
            variant={userVote === "A" ? "default" : "outline"}
            className="flex-1"
          >
            {post.sideA}
            <span className="ml-1 text-xs">
              ({post.votesA} {totalVotes > 0 && `· ${Math.round((post.votesA / totalVotes) * 100)}%`})
            </span>
          </Button>
          
          <Button
            onClick={() => handleVote("B")}
            variant={userVote === "B" ? "default" : "outline"}
            className="flex-1"
          >
            {post.sideB}
            <span className="ml-1 text-xs">
              ({post.votesB} {totalVotes > 0 && `· ${Math.round((post.votesB / totalVotes) * 100)}%`})
            </span>
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-stretch pt-0">
        <div className="flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center text-muted-foreground"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            {post.comments.length} {post.comments.length === 1 ? "Comment" : "Comments"}
          </Button>
          
          <Button variant="ghost" size="sm">
            View AI Advice
          </Button>
        </div>
        
        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 w-full animate-fade-in">
            {post.comments.length > 0 ? (
              <div className="space-y-3 mb-3">
                {post.comments.map(comment => (
                  <div key={comment.id} className="bg-secondary/30 p-2 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{comment.authorDisplayName}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mb-3">No comments yet. Be the first to comment!</p>
            )}
            
            <div className="flex gap-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="min-h-[80px]"
              />
            </div>
            <Button 
              onClick={handleAddComment}
              disabled={!newComment.trim()} 
              size="sm"
              className="mt-2"
            >
              Post Comment
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
