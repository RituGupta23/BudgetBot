import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import {
  User,
  Phone,
  MessageSquare,
  LogOut,
  Copy,
  CheckCircle,
  ExternalLink,
  Settings,
  Bell,
  Shield,
  Eye,
  Edit3,
  Save,
  X,
  Smartphone,
  Mail,
  Calendar,
  Award,
} from "lucide-react"

const SettingsPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [copiedItem, setCopiedItem] = useState("")
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: true,
    weekly: false,
  })

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const copyToClipboard = async (text, item) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(item)
      setTimeout(() => setCopiedItem(""), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleProfileSave = () => {
    // Here you would typically make an API call to update the profile
    console.log("Saving profile:", profileData)
    setEditingProfile(false)
  }

  const handleProfileCancel = () => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    })
    setEditingProfile(false)
  }

  const whatsappNumber = "+1 415 523 8886"
  const joinCode = "join local-carry"

  const memberSince = new Date(user?.createdAt || Date.now()).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] via-[#F7EFE5] to-[#C3ACD0]/20 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="mb-10">
          <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-2xl flex items-center justify-center shadow-lg">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7743DB] to-[#C3ACD0]">
                  Account Settings
                </h1>
                <p className="text-lg text-gray-600 mt-1">Manage your profile, preferences, and WhatsApp integration</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Account */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-xl flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                    <p className="text-sm text-gray-600">Your personal account details</p>
                  </div>
                </div>
                {!editingProfile ? (
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-[#7743DB] bg-[#C3ACD0]/20 hover:bg-[#C3ACD0]/30 rounded-xl transition-all"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleProfileSave}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#7743DB] to-[#C3ACD0] hover:from-[#6B3BC7] hover:to-[#B89BC4] rounded-xl transition-all"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleProfileCancel}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-[#F7EFE5] hover:bg-[#C3ACD0]/30 rounded-xl transition-all"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-[#F7EFE5] rounded-xl">
                  <div className="w-12 h-12 bg-[#C3ACD0] rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-[#7743DB]" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    {editingProfile ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border border-[#C3ACD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7743DB] bg-[#FFFBF5]"
                      />
                    ) : (
                      <p className="text-base font-semibold text-gray-900 mt-1">{user?.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-[#F7EFE5] rounded-xl">
                  <div className="w-12 h-12 bg-[#C3ACD0] rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#7743DB]" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    {editingProfile ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border border-[#C3ACD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7743DB] bg-[#FFFBF5]"
                      />
                    ) : (
                      <p className="text-base font-semibold text-gray-900 mt-1">{user?.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-[#F7EFE5] rounded-xl">
                  <div className="w-12 h-12 bg-[#C3ACD0] rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#7743DB]" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700">WhatsApp Number</label>
                    {editingProfile ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border border-[#C3ACD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7743DB] bg-[#FFFBF5]"
                      />
                    ) : (
                      <p className="text-base font-semibold text-gray-900 mt-1">{user?.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Integration */}
            <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">WhatsApp Integration</h2>
                  <p className="text-sm text-gray-600">Connect your WhatsApp for expense tracking</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#F7EFE5] to-[#FFFBF5] border border-[#C3ACD0] rounded-xl p-6 mb-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Quick Setup Guide</h3>
                    <p className="text-sm text-gray-600">
                      Follow these simple steps to connect your WhatsApp and start tracking expenses automatically.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 border border-[#F7EFE5] rounded-xl hover:bg-[#F7EFE5] transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[#7743DB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900">Send Join Message</p>
                      <p className="text-sm text-gray-600">Copy and send this code to our WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <code className="px-4 py-2 bg-[#F7EFE5] rounded-lg text-sm font-mono text-[#7743DB] border border-[#C3ACD0]">
                      {joinCode}
                    </code>
                    <button
                      onClick={() => copyToClipboard(joinCode, "joinCode")}
                      className="p-2 text-[#7743DB] hover:text-[#6B3BC7] hover:bg-[#C3ACD0]/20 rounded-lg transition-all"
                      title="Copy join code"
                    >
                      {copiedItem === "joinCode" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 border border-[#F7EFE5] rounded-xl hover:bg-[#F7EFE5] transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[#7743DB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900">WhatsApp Number</p>
                      <p className="text-sm text-gray-600">Send the message to this number</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <code className="px-4 py-2 bg-[#F7EFE5] rounded-lg text-sm font-mono text-[#7743DB] border border-[#C3ACD0]">
                      {whatsappNumber}
                    </code>
                    <button
                      onClick={() => copyToClipboard(whatsappNumber, "whatsappNumber")}
                      className="p-2 text-[#7743DB] hover:text-[#6B3BC7] hover:bg-[#C3ACD0]/20 rounded-lg transition-all"
                      title="Copy WhatsApp number"
                    >
                      {copiedItem === "whatsappNumber" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(joinCode)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all"
                      title="Open in WhatsApp"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="p-5 border border-[#F7EFE5] rounded-xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-8 h-8 bg-[#7743DB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900">Start Tracking</p>
                      <p className="text-sm text-gray-600">Send expense messages like these examples</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-12">
                    {[
                      "Spent ₹25 on lunch at McDonald's",
                      "Uber ride ₹15",
                      "Coffee ₹4.50",
                      "Groceries ₹120 at Walmart",
                    ].map((example, index) => (
                      <div
                        key={index}
                        className="bg-[#F7EFE5] p-3 rounded-lg border border-[#C3ACD0] text-sm font-mono text-gray-700"
                      >
                        "{example}"
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
                  <p className="text-sm text-gray-600">Choose how you want to receive updates</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "email",
                    title: "Email Notifications",
                    description: "Receive weekly expense summaries via email",
                  },
                  {
                    key: "whatsapp",
                    title: "WhatsApp Confirmations",
                    description: "Get confirmation messages when expenses are tracked",
                  },
                  {
                    key: "weekly",
                    title: "Weekly Reports",
                    description: "Receive detailed weekly spending reports",
                  },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between p-4 border border-[#F7EFE5] rounded-xl hover:bg-[#F7EFE5] transition-all"
                  >
                    <div>
                      <p className="text-base font-semibold text-gray-900">{setting.title}</p>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [setting.key]: !notifications[setting.key] })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications[setting.key] ? "bg-[#7743DB]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications[setting.key] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Account Stats & Actions */}
          <div className="space-y-8">
            {/* Account Stats */}
            <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-xl flex items-center justify-center shadow-md">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Account Stats</h3>
                  <p className="text-sm text-gray-600">Your journey so far</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-[#F7EFE5] rounded-xl">
                  <Calendar className="w-5 h-5 text-[#7743DB]" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Member Since</p>
                    <p className="text-sm text-gray-600">{memberSince}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-[#F7EFE5] rounded-xl">
                  <Smartphone className="w-5 h-5 text-[#7743DB]" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">WhatsApp Status</p>
                    <p className="text-sm text-green-600">Connected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Privacy & Security</h3>
                  <p className="text-sm text-gray-600">Manage your data</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 text-left border border-[#F7EFE5] rounded-xl hover:bg-[#F7EFE5] transition-all">
                  <span className="text-sm font-medium text-gray-900">Change Password</span>
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-3 text-left border border-[#F7EFE5] rounded-xl hover:bg-[#F7EFE5] transition-all">
                  <span className="text-sm font-medium text-gray-900">Export Data</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-3 text-left border border-[#F7EFE5] rounded-xl hover:bg-[#F7EFE5] transition-all">
                  <span className="text-sm font-medium text-gray-900">Delete Account</span>
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Actions</h3>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-6 py-3 border border-red-300 rounded-xl text-red-700 hover:bg-red-50 hover:border-red-400 transition-all font-medium"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
