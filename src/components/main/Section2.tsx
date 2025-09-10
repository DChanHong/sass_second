'use client';

import { MBTIResponse } from '@/types/mbti';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Section2Props {
    mbtiList: MBTIResponse[];
}
export default function Section2({ mbtiList }: Section2Props) {
    return (
        <section className="py-20 bg-emerald-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-emerald-900 mb-4">
                        “나랑 비슷한 MBTI는 뭘 쓰지?”
                    </h2>
                    <p className="text-xl text-emerald-700 max-w-2xl mx-auto">
                        각 성격 유형에 어울리는 자취템과 공간 아이디어를 모아봤어요!<br />
                        눌러서 구경해보세요 👀
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mbtiList?.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={`/content/${service.code}`}
                                className="block p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:cursor-pointer group"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="text-4xl">{service.mainIcon}</div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                                            {service.name} 
                                        </h3> 
                                        <p className="text-gray-600 mt-1 line-clamp-1">{service.title} - {service.mainDescription}</p>
                                    </div>
                                    <div
                                        className="text-gray-400 group-hover:text-emerald-500 transition-colors duration-200">
                                        →
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
