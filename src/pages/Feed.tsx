
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import PostCard, { Post } from "@/components/posts/PostCard";
import FloatingActionButton from "@/components/shared/FloatingActionButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock data
const mockPosts: Post[] = [
  {
    id: "1",
    authorInfo: {
      gender: "Female",
      ageGroup: "25-34",
      isAnonymous: true,
    },
    content: "My partner wants to move to a different country for a job opportunity, but I don't want to leave my family and friends. We've been together for 5 years and I love them, but I don't think I can make this sacrifice. Am I being selfish?",
    sideA: "Me",
    sideB: "Partner",
    relationshipType: "Dating",
    votesA: 42,
    votesB: 58,
    comments: [
      {
        id: "c1",
        authorId: "user1",
        authorDisplayName: "Anon25",
        content: "Moving countries is a huge decision. Neither of you is wrong, but you need to consider what you both want long term.",
        createdAt: "2025-05-15T12:00:00Z"
      },
      {
        id: "c2",
        authorId: "user2",
        authorDisplayName: "RelationshipGuru",
        content: "Have you considered trying long distance for a while? Maybe you could visit often and see if you might like the new country.",
        createdAt: "2025-05-15T14:30:00Z"
      }
    ],
    createdAt: "2025-05-15T10:00:00Z"
  },
  {
    id: "2",
    authorInfo: {
      gender: "Male",
      ageGroup: "35-44",
      isAnonymous: true,
    },
    title: "Wife spent our savings without telling me",
    content: "I just found out my wife spent $5,000 from our joint savings account on a designer bag without discussing it with me first. We've been saving for a house down payment. I'm furious but she says I'm overreacting since she earns good money too. Who's right here?",
    sideA: "Me",
    sideB: "Wife",
    relationshipType: "Marriage",
    votesA: 87,
    votesB: 13,
    comments: [
      {
        id: "c3",
        authorId: "user3",
        authorDisplayName: "MarriedTen",
        content: "That's a major breach of trust. Joint accounts require joint decisions on big purchases.",
        createdAt: "2025-05-14T11:20:00Z"
      }
    ],
    createdAt: "2025-05-14T09:45:00Z"
  },
  {
    id: "3",
    authorInfo: {
      gender: "Other",
      ageGroup: "18-24",
      isAnonymous: true,
    },
    content: "My best friend always cancels plans last minute. This has happened at least 10 times in the past few months. When I brought it up, they said I was being too sensitive and that they're just busy. Should I distance myself or am I overreacting?",
    sideA: "Me",
    sideB: "Friend",
    relationshipType: "Friendship",
    votesA: 63,
    votesB: 37,
    comments: [],
    createdAt: "2025-05-13T15:30:00Z"
  }
];

const Feed = () => {
  const [filter, setFilter] = useState("all");
  const [posts, setPosts] = useState(mockPosts);
  
  const filteredPosts = filter === "all" 
    ? posts 
    : posts.filter(post => post.relationshipType === filter);
  
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Relationship Dilemmas</h1>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="filter" className="sr-only">Filter by</Label>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]" id="filter">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Dating">Dating</SelectItem>
              <SelectItem value="Marriage">Marriage</SelectItem>
              <SelectItem value="Friendship">Friendship</SelectItem>
              <SelectItem value="Family">Family</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found. Try a different filter or add your own!</p>
        </div>
      )}
      
      <FloatingActionButton to="/post" label="New Post" />
    </AppLayout>
  );
};

export default Feed;
