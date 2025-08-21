"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useContentManager } from "@/lib/content-manager"
import type { Myth } from "@/lib/types"

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const contentManager = useContentManager()
  const [activeTab, setActiveTab] = useState<"overview" | "myths" | "schedule">("overview")
  const [editingMyth, setEditingMyth] = useState<Myth | null>(null)

  if (!isOpen) return null

  const stats = contentManager.getStats()
  const currentWeek = contentManager.getCurrentWeekMyth()
  const pastWeeks = contentManager.getPastWeeks()
  const upcomingWeeks = contentManager.getUpcomingWeeks()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-montserrat font-bold text-gray-900">Content Management</h2>
            <Button variant="outline" onClick={onClose}>
              ✕ Close
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            {[
              { id: "overview", label: "Overview" },
              { id: "myths", label: "Myths" },
              { id: "schedule", label: "Schedule" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id ? "text-red-600 border-b-2 border-red-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.totalMyths}</div>
                    <div className="text-sm text-gray-600">Total Myths</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-amber-600">{stats.categories}</div>
                    <div className="text-sm text-gray-600">Categories</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.weeksActive}</div>
                    <div className="text-sm text-gray-600">Weeks Active</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.currentWeek}</div>
                    <div className="text-sm text-gray-600">Current Week</div>
                  </Card>
                </div>

                {currentWeek && (
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4 text-green-600">This Week's Featured Myth</h3>
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{currentWeek.myth.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">{currentWeek.myth.myth}</h4>
                        <p className="text-gray-600 mb-2">{currentWeek.myth.reality}</p>
                        <div className="flex space-x-2">
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                            {currentWeek.myth.category}
                          </span>
                          <span className="bg-amber-100 text-amber-600 px-2 py-1 rounded text-sm">
                            {currentWeek.myth.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4">Past Weeks ({pastWeeks.length})</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {pastWeeks.map(({ myth, week }) => (
                        <div key={week.weekNumber} className="flex items-center space-x-2 text-sm">
                          <span className="text-lg">{myth.icon}</span>
                          <span className="text-gray-600">Week {week.weekNumber}:</span>
                          <span className="font-medium">{myth.category}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4">Upcoming Weeks ({upcomingWeeks.length})</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {upcomingWeeks.map(({ myth, week }) => (
                        <div key={week.weekNumber} className="flex items-center space-x-2 text-sm">
                          <span className="text-lg">{myth.icon}</span>
                          <span className="text-gray-600">Week {week.weekNumber}:</span>
                          <span className="font-medium">{myth.category}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "myths" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">All Myths</h3>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">+ Add New Myth</Button>
                </div>

                <div className="grid gap-4">
                  {contentManager.getAllMyths().map((myth) => (
                    <Card key={myth.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="text-2xl">{myth.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1">{myth.myth}</h4>
                            <p className="text-gray-600 text-sm mb-2">{myth.reality}</p>
                            <div className="flex space-x-2">
                              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">{myth.category}</span>
                              <span className="bg-amber-100 text-amber-600 px-2 py-1 rounded text-xs">
                                {myth.difficulty}
                              </span>
                              {myth.weekNumber && (
                                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                                  Week {myth.weekNumber}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "schedule" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Weekly Schedule</h3>
                <div className="grid gap-4">
                  {contentManager.getAllMyths().map((myth) => {
                    const week = contentManager.getCurrentWeekMyth()
                    const isCurrentWeek = week?.myth.id === myth.id

                    return (
                      <Card key={myth.id} className={`p-4 ${isCurrentWeek ? "ring-2 ring-green-500" : ""}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-xl">{myth.icon}</div>
                            <div>
                              <div className="font-medium">Week {myth.weekNumber || "TBD"}</div>
                              <div className="text-sm text-gray-600">{myth.category}</div>
                            </div>
                          </div>
                          {isCurrentWeek && (
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm font-medium">
                              Current Week
                            </span>
                          )}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
