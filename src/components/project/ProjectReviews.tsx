
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Star } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';

interface Review {
  name: string;
  position?: string;
  avatar?: string;
  content: string;
  rating: number;
}

interface ProjectReviewsProps {
  reviews?: Review[];
}

const ProjectReviews: React.FC<ProjectReviewsProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;
  
  return (
    <ScrollReveal>
      <div className="my-12">
        <h3 className="text-xl font-bold mb-6 text-gold">Hodnocení klienta</h3>
        
        <div className="grid grid-cols-1 gap-6">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/40 border-gold/5 hover:border-gold/20 transition-duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border-2 border-gold/20">
                      {review.avatar ? (
                        <AvatarImage src={review.avatar} alt={review.name} />
                      ) : (
                        <AvatarFallback className="bg-gold/20 text-gold">
                          {review.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                        <div>
                          <h4 className="font-semibold">{review.name}</h4>
                          {review.position && (
                            <p className="text-sm text-foreground/60">{review.position}</p>
                          )}
                        </div>
                        
                        <div className="flex mt-1 sm:mt-0">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < review.rating ? "text-gold fill-gold" : "text-foreground/30"}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-foreground/80 italic">"{review.content}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ProjectReviews;
