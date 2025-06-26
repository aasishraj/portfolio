import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Trophy, Users, Heart } from "lucide-react"

const certifications = [
  {
    title: "Campuzon Winter Workshop - Web Development",
    type: "Workshop",
    icon: <Award className="h-5 w-5" />
  },
  {
    title: "Spark AR - Instagram Filters",
    type: "Certification", 
    icon: <Award className="h-5 w-5" />
  },
  {
    title: "Typing Titans Winner - 83 WPM",
    type: "Achievement",
    icon: <Trophy className="h-5 w-5" />
  }
]

const activities = [
  {
    title: "Speaker: DSA Workshop",
    organization: "Marian Engineering College",
    type: "Speaking",
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Member: GDSC, Mulearn, Tinkerhub",
    organization: "Tech Communities",
    type: "Community",
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Hobbies: Blogging, Calisthenics, DIY Electronics, Keyboard",
    organization: "Personal Interests",
    type: "Hobby",
    icon: <Heart className="h-5 w-5" />
  }
]

export function CertificationsSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Certifications & Activities</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="flex-shrink-0 text-primary">
                    {cert.icon}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium mb-1">{cert.title}</h4>
                    <Badge variant="outline" className="text-xs">{cert.type}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="flex-shrink-0 text-primary">
                    {activity.icon}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium mb-1">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{activity.organization}</p>
                    <Badge variant="outline" className="text-xs">{activity.type}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 