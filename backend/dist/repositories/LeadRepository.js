"use strict";
// ============================================
// src/repositories/LeadRepository.ts
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRepository = void 0;
class LeadRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // ==========================================
    // CREATE Operations
    // ==========================================
    /**
     * Create a new lead (like EF Add + SaveChanges)
     */
    async create(data) {
        return await this.prisma.lead.create({
            data: {
                ...data,
                status: 'NEW'
            },
            include: {
                conversations: true,
                bookings: true
            }
        });
    }
    // ==========================================
    // READ Operations
    // ==========================================
    /**
     * Find lead by ID (like EF Find)
     */
    async findById(id) {
        return await this.prisma.lead.findUnique({
            where: { id },
            include: {
                conversations: {
                    orderBy: { createdAt: 'desc' }
                },
                bookings: {
                    orderBy: { scheduledTime: 'desc' }
                },
                project: true
            }
        });
    }
    /**
     * Find lead by email (like EF Where + FirstOrDefault)
     */
    async findByEmail(email) {
        return await this.prisma.lead.findUnique({
            where: { email },
            include: {
                conversations: {
                    orderBy: { createdAt: 'desc' },
                    take: 5 // Last 5 conversations
                }
            }
        });
    }
    /**
     * Get all leads with filters (like EF LINQ query)
     */
    async findAll(options) {
        const where = {};
        if (options.status) {
            where.status = options.status;
        }
        if (options.source) {
            where.source = options.source;
        }
        if (options.search) {
            where.OR = [
                { name: { contains: options.search, mode: 'insensitive' } },
                { email: { contains: options.search, mode: 'insensitive' } },
                { company: { contains: options.search, mode: 'insensitive' } }
            ];
        }
        const [leads, total] = await Promise.all([
            this.prisma.lead.findMany({
                where,
                skip: options.skip || 0,
                take: options.take || 50,
                orderBy: { createdAt: 'desc' },
                include: {
                    conversations: {
                        orderBy: { createdAt: 'desc' },
                        take: 1 // Just the latest
                    },
                    bookings: {
                        where: { status: 'SCHEDULED' }
                    }
                }
            }),
            this.prisma.lead.count({ where })
        ]);
        return { leads, total };
    }
    /**
     * Get leads with recent activity (like EF complex query)
     */
    async getRecentlyActive(days = 7) {
        const since = new Date();
        since.setDate(since.getDate() - days);
        return await this.prisma.lead.findMany({
            where: {
                OR: [
                    {
                        conversations: {
                            some: {
                                createdAt: { gte: since }
                            }
                        }
                    },
                    {
                        bookings: {
                            some: {
                                scheduledTime: { gte: since }
                            }
                        }
                    }
                ]
            },
            include: {
                conversations: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            },
            orderBy: { updatedAt: 'desc' }
        });
    }
    // ==========================================
    // UPDATE Operations
    // ==========================================
    /**
     * Update lead (like EF Update + SaveChanges)
     */
    async update(id, data) {
        return await this.prisma.lead.update({
            where: { id },
            data
        });
    }
    /**
     * Update lead status
     */
    async updateStatus(id, status) {
        return await this.update(id, { status });
    }
    /**
     * Add estimate to lead
     */
    async addEstimate(id, estimate) {
        return await this.update(id, {
            estimatedBudgetMin: estimate.minBudget,
            estimatedBudgetMax: estimate.maxBudget,
            estimatedTimeline: estimate.timeline,
            status: 'QUOTED'
        });
    }
    // ==========================================
    // DELETE Operations
    // ==========================================
    /**
     * Soft delete (update status to INACTIVE)
     */
    async softDelete(id) {
        return await this.update(id, {
            status: 'INACTIVE'
        });
    }
    /**
     * Hard delete (permanent removal)
     */
    async delete(id) {
        return await this.prisma.lead.delete({
            where: { id }
        });
    }
    // ==========================================
    // AGGREGATE Operations (like EF Count, Sum, etc.)
    // ==========================================
    /**
     * Count leads by status
     */
    async countByStatus() {
        const counts = await this.prisma.lead.groupBy({
            by: ['status'],
            _count: true
        });
        return counts.reduce((acc, item) => {
            acc[item.status] = item._count;
            return acc;
        }, {});
    }
    /**
     * Get total leads count
     */
    async count(status) {
        return await this.prisma.lead.count({
            where: status ? { status } : undefined
        });
    }
    /**
     * Get conversion statistics
     */
    async getConversionStats() {
        const [total, quoted, won] = await Promise.all([
            this.count(),
            this.count('QUOTED'),
            this.count('WON')
        ]);
        return {
            total,
            quoted,
            won,
            conversionRate: total > 0 ? (won / total) * 100 : 0
        };
    }
}
exports.LeadRepository = LeadRepository;
//# sourceMappingURL=LeadRepository.js.map