import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClinicalTrialManagement from "./clinical-trial-management"
import AdvancedDataAnalysis from "./advanced-data-analysis"
import EnhancedCollaborationPlatform from "./enhanced-collaboration-platform"
import EthicsReviewWorkflow from "./ethics-review-workflow"

const ResearchClient = () => {
  return (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="overview">概览</TabsTrigger>
        <TabsTrigger value="projects">项目管理</TabsTrigger>
        <TabsTrigger value="trials">临床试验</TabsTrigger>
        <TabsTrigger value="analysis">数据分析</TabsTrigger>
        <TabsTrigger value="collaboration">协作平台</TabsTrigger>
        <TabsTrigger value="ethics">伦理审查</TabsTrigger>
        <TabsTrigger value="experiment">实验设计</TabsTrigger>
        <TabsTrigger value="samples">样本管理</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p>This is the overview tab.</p>
      </TabsContent>
      <TabsContent value="projects">
        <p>This is the projects tab.</p>
      </TabsContent>
      <TabsContent value="trials">
        <ClinicalTrialManagement />
      </TabsContent>
      <TabsContent value="analysis">
        <AdvancedDataAnalysis />
      </TabsContent>
      <TabsContent value="collaboration">
        <EnhancedCollaborationPlatform />
      </TabsContent>
      <TabsContent value="ethics">
        <EthicsReviewWorkflow />
      </TabsContent>
      <TabsContent value="experiment">
        <p>This is the experiment tab.</p>
      </TabsContent>
      <TabsContent value="samples">
        <p>This is the samples tab.</p>
      </TabsContent>
    </Tabs>
  )
}

export default ResearchClient
