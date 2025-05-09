"use client";

import { useState } from "react";
import { motion } from "@/lib/motion";
import { Loader2, Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setFormState({ name: "", email: "", message: "" });
    
    toast({
      title: "Message sent successfully!",
      description: "I'll get back to you as soon as possible.",
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-chart-3/5 to-background/20 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block">
              <span className="relative">
                Get In
                <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-chart-1 to-chart-2">
                  Touch
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-chart-1/50 to-chart-2/50"></span>
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Have a project in mind or want to collaborate? Let's talk!
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-border/50 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="bg-background/50 resize-none"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-1/90 hover:to-chart-2/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
              <p className="text-muted-foreground mb-6">
                Whether you have a question about a project, job opportunity, or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 hover:border-chart-2/50 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-chart-1/20 text-chart-1">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Email Me At</h4>
                  <a 
                    href="mailto:hello@example.com" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    hello@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 hover:border-chart-2/50 transition-colors">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-chart-1/20 text-chart-1">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Social Media</h4>
                  <div className="flex gap-2 mt-1">
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Twitter
                    </a>
                    <span className="text-muted-foreground">•</span>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      LinkedIn
                    </a>
                    <span className="text-muted-foreground">•</span>
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}