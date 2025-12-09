import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Users, DollarSign, TrendingUp, Gift, Share2, Award } from 'lucide-react';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function ReferAndEarn() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [stats, setStats] = useState({
    totalReferrals: 0,
    successfulReferrals: 0,
    totalEarnings: 0,
  });
  const [showJoinModal, setShowJoinModal] = useState(!isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && user) {
      generateReferralCode();
      fetchReferralStats();
    }
  }, [isAuthenticated, user]);

  const generateReferralCode = () => {
    if (user?.uid) {
      // Generate unique referral code based on user ID
      const code = user.uid.substring(0, 8).toUpperCase();
      setReferralCode(code);
    }
  };

  const fetchReferralStats = async () => {
    if (!user?.uid) return;

    try {
      const referralsRef = collection(db, 'referrals');
      const q = query(referralsRef, where('referrerId', '==', user.uid));
      const snapshot = await getDocs(q);
      
      const total = snapshot.size;
      const successful = snapshot.docs.filter(doc => doc.data().status === 'completed').length;
      const earnings = successful * 250; // $250 per successful referral

      setStats({
        totalReferrals: total,
        successfulReferrals: successful,
        totalEarnings: earnings,
      });
    } catch (error) {
      console.error('Error fetching referral stats:', error);
    }
  };

  const getReferralLink = () => {
    return `${window.location.origin}/register?ref=${referralCode}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getReferralLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Taskify',
          text: 'Join Taskify and earn money! Use my referral link:',
          url: getReferralLink(),
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  if (showJoinModal && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Join Taskify's Referral Rewards</h2>
            <p className="text-gray-600">
              Refer your network to join Taskify and <span className="text-blue-600 font-semibold">earn $250-$15,000</span> in bonuses for every successful referral.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Share2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Share your referral link</h3>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Get paid for each referral</h3>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Unlimited earning potential</h3>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">All-time earnings</p>
                <p className="text-2xl font-bold">$1M+</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Top referrer earnings</p>
                <p className="text-2xl font-bold">$100K+</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Join now
            </button>
            <button
              onClick={() => setShowJoinModal(false)}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Refer & Earn</h1>
          <p className="text-xl text-gray-600">
            Share Taskify with your network and earn up to <span className="text-blue-600 font-semibold">$15,000</span> per referral!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="text-3xl font-bold">{stats.totalReferrals}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Referrals</h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-green-600" />
              <span className="text-3xl font-bold">{stats.successfulReferrals}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Successful</h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <span className="text-3xl font-bold">${stats.totalEarnings.toLocaleString()}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Earnings</h3>
          </div>
        </div>

        {/* Referral Link Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Share your referral link</h2>
          <p className="text-gray-600 mb-6">
            Use this link to refer your friends and professional network. There's no limit to how many people you can refer.
          </p>

          <div className="flex gap-3 mb-4">
            <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 flex items-center gap-2">
              <span className="text-sm text-gray-600 truncate">{getReferralLink()}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleShare}
            className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Link
          </button>

          <p className="text-sm text-gray-500 mt-4">
            With this referral link, we recommend that you promote it on your blog, social profile, website, videos, etc (the more places the better).
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">How it works</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Share your link</h3>
                <p className="text-gray-600">Send your unique referral link to friends, colleagues, or post it on social media.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">They sign up</h3>
                <p className="text-gray-600">When someone uses your link to register and gets hired for a job, you earn a reward.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Get paid</h3>
                <p className="text-gray-600">Earn $250 to $15,000 for each successful referral. Payments are processed monthly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Reward Tiers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-blue-600 font-bold text-3xl mb-2">$250</div>
              <p className="text-gray-600 font-medium">Entry Level Jobs</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center border-2 border-purple-400">
              <div className="text-purple-600 font-bold text-3xl mb-2">$5,000</div>
              <p className="text-gray-600 font-medium">Mid-Level Jobs</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-green-600 font-bold text-3xl mb-2">$15,000</div>
              <p className="text-gray-600 font-medium">Senior Level Jobs</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Rewards vary based on the position level and salary of the referred candidate's placement.
          </p>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-8 text-gray-600">
          <p>If you have more questions, you can reach out to us at</p>
          <a href="mailto:support@taskify.com" className="text-blue-600 font-medium hover:underline">
            support@taskify.com
          </a>
        </div>
      </div>
    </div>
  );
}
