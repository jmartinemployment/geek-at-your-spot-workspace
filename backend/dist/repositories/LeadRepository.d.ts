import { PrismaClient, Lead, LeadStatus, Prisma } from '@prisma/client';
export declare class LeadRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    /**
     * Create a new lead (like EF Add + SaveChanges)
     */
    create(data: {
        name: string;
        email: string;
        phone?: string;
        company?: string;
        projectDescription: string;
        estimatedBudgetMin?: number;
        estimatedBudgetMax?: number;
        estimatedTimeline?: string;
        source?: string;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<Lead>;
    /**
     * Find lead by ID (like EF Find)
     */
    findById(id: number): Promise<Lead | null>;
    /**
     * Find lead by email (like EF Where + FirstOrDefault)
     */
    findByEmail(email: string): Promise<Lead | null>;
    /**
     * Get all leads with filters (like EF LINQ query)
     */
    findAll(options: {
        status?: LeadStatus;
        source?: string;
        skip?: number;
        take?: number;
        search?: string;
    }): Promise<{
        leads: Lead[];
        total: number;
    }>;
    /**
     * Get leads with recent activity (like EF complex query)
     */
    getRecentlyActive(days?: number): Promise<Lead[]>;
    /**
     * Update lead (like EF Update + SaveChanges)
     */
    update(id: number, data: Prisma.LeadUpdateInput): Promise<Lead>;
    /**
     * Update lead status
     */
    updateStatus(id: number, status: LeadStatus): Promise<Lead>;
    /**
     * Add estimate to lead
     */
    addEstimate(id: number, estimate: {
        minBudget: number;
        maxBudget: number;
        timeline: string;
    }): Promise<Lead>;
    /**
     * Soft delete (update status to INACTIVE)
     */
    softDelete(id: number): Promise<Lead>;
    /**
     * Hard delete (permanent removal)
     */
    delete(id: number): Promise<Lead>;
    /**
     * Count leads by status
     */
    countByStatus(): Promise<Record<string, number>>;
    /**
     * Get total leads count
     */
    count(status?: LeadStatus): Promise<number>;
    /**
     * Get conversion statistics
     */
    getConversionStats(): Promise<{
        total: number;
        quoted: number;
        won: number;
        conversionRate: number;
    }>;
}
//# sourceMappingURL=LeadRepository.d.ts.map