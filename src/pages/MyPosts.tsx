
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import PostCard, { Post } from "@/components/posts/PostCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
    content: "I lent my friend $500 for an emergency 3 months ago, and they promised to pay me back within a month. Now they're avoiding the topic whenever I bring it up and just make excuses. I need that money back, but I don't want to ruin our friendship.",
    sideA: "Me",
    sideB: "Friend",
    relationshipType: "Friendship",
    votesA: 83,
    votesB: 17,
    comments: [
      {
        id: "c10",
        authorId: "user5",
        authorDisplayName: "MoneyMentor",
        content: "Never lend money to friends that you can't afford to lose. That said, you need to have a direct conversation.",
        createdAt: "2025-05-10T14:20:00Z"
      },
      {
        id: "c11",
        authorId: "user6",
        authorDisplayName: "SocialSage",
        content: "Suggest a payment plan. It shows you're serious but also understanding.",
        createdAt: "2025-05-10T16:45:00Z"
      }
    ],
    createdAt: "2025-05-10T10:30:00Z"
  },
  {
    id: "user-2",
    authorInfo: {
      gender: "Male",
      ageGroup: "25-34",
      isAnonymous: false,
    },
    content: "My girlfriend wants to move in together after 6 months of dating. I think it's too soon, but she says it makes financial sense. I'm worried this might rush our relationship, but I also don't want to disappoint her.",
    sideA: "Me",
    sideB: "Girlfriend",
    relationshipType: "Dating",
    votesA: 65,
    votesB: 35,
    comments: [
      {
        id: "c12",
        authorId: "user7",
        authorDisplayName: "LoveCoach",
        content: "Moving in is a big step. If you're not ready, you shouldn't do it just for financial reasons.",
        createdAt: "2025-05-05T11:10:00Z"
      }
    ],
    createdAt: "2025-05-05T09:15:00Z"
  }
];

const MyPosts = () => {
  const [posts, setPosts] = useState<Post[]>(mockUserPosts);
  const { currentUser } = useAuth();
  
  // In a real app, we would fetch the user's posts from the API
  
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Posts</h1>
      </div>
      
      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground mb-4">You haven't created any posts yet.</p>
          <Button asChild>
            <Link to="/post">Create Your First Post</Link>
          </Button>
        </div>
      )}
    </AppLayout>
  );
};

export default MyPosts;
