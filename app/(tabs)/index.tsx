import {
    Bell,
    Download,
    Heart,
    MessageCircle,
    Send,
} from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface Post {
  id: number;
  authorName: string;
  authorAvatar: string | null;
  location: string;
  createdAt: Date;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  userHasLiked: boolean;
}

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      authorName: "Alex Johnson",
      authorAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: "San Francisco, CA",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
      caption: "Amazing sunset at the beach today! 🌅",
      likes: 24,
      comments: 8,
      userHasLiked: false,
    },
    {
      id: 2,
      authorName: "Sarah Chen",
      authorAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
      location: "New York, NY",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      image:
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&h=500&fit=crop",
      caption: "Coffee and code - perfect morning combo ☕️",
      likes: 42,
      comments: 12,
      userHasLiked: true,
    },
    {
      id: 3,
      authorName: "Mike Torres",
      authorAvatar: null,
      location: "Denver, CO",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
      caption:
        "Mountain hiking adventure! The view was worth every step 🏔️",
      likes: 67,
      comments: 15,
      userHasLiked: false,
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null);

  const formatPostDateTime = (createdAt: Date) => {
    return {
      time: createdAt.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      date: createdAt.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              userHasLiked: !post.userHasLiked,
              likes: post.userHasLiked
                ? post.likes - 1
                : post.likes + 1,
            }
          : post
      )
    );
  };

  const getUserInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || "?";
  };

  const toggleComments = (postId: number) => {
    setActiveCommentPost(activeCommentPost === postId ? null : postId);
  };

  const renderPost = (post: Post) => {
    const { time, date } = formatPostDateTime(post.createdAt);
    const isCommentOpen = activeCommentPost === post.id;

    return (
      <View key={post.id} style={styles.post}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.postHeaderLeft}>
            <View style={styles.avatarContainer}>
              {post.authorAvatar ? (
                <Image
                  source={{ uri: post.authorAvatar }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {getUserInitials(post.authorName)}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.postHeaderInfo}>
              <Text style={styles.authorName}>
                {post.authorName}
              </Text>
              <Text style={styles.locationText}>
                SyncIn • {post.location}
              </Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {time}
            </Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        </View>

        {/* Post Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
          />
          <TouchableOpacity style={styles.downloadButton}>
            <Download color="white" size={16} />
          </TouchableOpacity>
        </View>

        {/* Caption */}
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>
              {post.caption}
            </Text>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => handleLike(post.id)}
            style={styles.actionButton}
          >
            <Heart
              size={20}
              color={post.userHasLiked ? "#ef4444" : "#6b7280"}
              fill={post.userHasLiked ? "#ef4444" : "none"}
            />
            <Text style={[
              styles.actionText,
              post.userHasLiked && styles.likedText
            ]}>
              {post.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleComments(post.id)}
            style={styles.actionButton}
          >
            <MessageCircle size={20} color="#6b7280" />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>
        </View>

        {/* Comment Section */}
        {isCommentOpen && (
          <View style={styles.commentsSection}>
            {/* Existing Comments */}
            <View style={styles.commentsContainer}>
              <View style={styles.commentItem}>
                <View style={styles.commentAvatarContainer}>
                  <View style={styles.commentAvatar}>
                    <Text style={styles.commentAvatarText}>JD</Text>
                  </View>
                </View>
                <View style={styles.commentContent}>
                  <Text style={styles.commentText}>
                    <Text style={styles.commentAuthor}>John Doe</Text>
                    <Text style={styles.commentMessage}> Absolutely stunning! 😍</Text>
                  </Text>
                  <Text style={styles.commentTime}>1h ago</Text>
                </View>
              </View>

              <View style={styles.commentItem}>
                <View style={styles.commentAvatarContainer}>
                  <View style={styles.commentAvatar}>
                    <Text style={styles.commentAvatarText}>EM</Text>
                  </View>
                </View>
                <View style={styles.commentContent}>
                  <Text style={styles.commentText}>
                    <Text style={styles.commentAuthor}>Emma Miller</Text>
                    <Text style={styles.commentMessage}> Wish I was there! 🌅</Text>
                  </Text>
                  <Text style={styles.commentTime}>30m ago</Text>
                </View>
              </View>
            </View>

            {/* Comment Input */}
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setNewComment}
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity
                disabled={!newComment.trim()}
                style={[styles.sendButtonContainer, { opacity: !newComment.trim() ? 0.5 : 1 }]}
              >
                <LinearGradient
                  colors={['#ec4899', '#22d3ee']}
                  style={styles.sendButton}
                >
                  <Send color="white" size={16} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#f8fafc', '#ecfdf5', '#eff6ff']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.spacer} />
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                SyncIn
              </Text>
              <Text style={styles.subtitle}>
                photos for everyday
              </Text>
            </View>
            
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#475569" />
              <View style={styles.badge}>
                <LinearGradient
                  colors={['#ec4899', '#ef4444']}
                  style={styles.badgeGradient}
                >
                  <Text style={styles.badgeText}>3</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feed */}
        <View style={styles.feed}>
          {posts.map((post) => renderPost(post))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerContent: {
    maxWidth: 512,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  spacer: {
    width: 32,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f46e5', // Simple indigo color instead of gradient
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  badgeGradient: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  feed: {
    maxWidth: 512,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  post: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 12,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fce7f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ec4899',
    fontWeight: '600',
  },
  postHeaderInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  locationText: {
    fontSize: 12,
    color: '#6b7280',
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  dateText: {
    fontSize: 12,
    color: '#6b7280',
  },
  imageContainer: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  downloadButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  captionContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  caption: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  likedText: {
    color: '#ef4444',
  },
  commentsSection: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  commentsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 160,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
  },
  commentAvatarContainer: {
    flexShrink: 0,
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fce7f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAvatarText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ec4899',
  },
  commentContent: {
    flex: 1,
  },
  commentText: {
    fontSize: 14,
  },
  commentAuthor: {
    fontWeight: '500',
    color: '#111827',
  },
  commentMessage: {
    color: '#374151',
  },
  commentTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  commentInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    fontSize: 14,
    backgroundColor: 'white',
    color: '#111827',
  },
  sendButtonContainer: {
    borderRadius: 20,
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
