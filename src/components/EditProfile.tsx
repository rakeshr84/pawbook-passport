import React, { useState } from "react";
import { ChevronLeft, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EditProfile({
  user,
  onSave,
  onCancel,
}: {
  user: { full_name?: string; email?: string; phone?: string } | null;
  onSave: (u: { full_name?: string; phone?: string }) => void;
  onCancel: () => void;
}) {
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const canSave = fullName.trim().length > 1;

  const handleSave = () => {
    if (canSave) {
      onSave({ full_name: fullName, phone });
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-light ios-transition mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Main Card */}
        <div className="glass-effect rounded-3xl p-8 shadow-xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-light text-foreground mb-2">Edit Profile</h1>
            <p className="text-muted-foreground font-light">Update your account details</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="glass-effect border-border pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">
                Email <span className="text-xs">(read-only)</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="glass-effect border-border pl-10 opacity-60 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">
                Phone <span className="text-xs">(optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 555 000 0000"
                  className="glass-effect border-border pl-10"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button
                onClick={onCancel}
                variant="ghost"
                size="lg"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!canSave}
                variant="gradient"
                size="lg"
                className="flex-1"
              >
                All set — you're doing great ✓
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground font-light">
            PawBuck 2.0 · Version 1.0.0
          </p>
        </div>

      </div>
    </div>
  );
}
