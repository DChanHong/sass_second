'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const mbtiCards = [
    {
        title: 'ISTJ',
        description: '계획적이고 꼼꼼한 현실주의자',
        icon: '📋',
        color: 'from-gray-500 to-blue-500'
    },
    {
        title: 'ISFJ',
        description: '따뜻하고 책임감 강한 집순이/집돌이',
        icon: '🧸',
        color: 'from-yellow-400 to-amber-500'
    },
    {
        title: 'INFJ',
        description: '조용한 이상주의 감성러',
        icon: '🌱',
        color: 'from-green-400 to-teal-500'
    },
    {
        title: 'INTJ',
        description: '계획과 전략의 달인, 완벽주의자',
        icon: '♟️',
        color: 'from-purple-600 to-indigo-500'
    },
    {
        title: 'ISTP',
        description: '실용적이고 뚝딱뚝딱 해결사',
        icon: '🔧',
        color: 'from-slate-500 to-gray-700'
    },
    {
        title: 'ISFP',
        description: '감각적이고 자유로운 아티스트',
        icon: '🎨',
        color: 'from-pink-400 to-rose-500'
    },
    {
        title: 'INFP',
        description: '분위기에 민감한 감성러',
        icon: '🕯️',
        color: 'from-rose-400 to-pink-500'
    },
    {
        title: 'INTP',
        description: '호기심 많은 아이디어 뱅크',
        icon: '💡',
        color: 'from-cyan-500 to-blue-500'
    },
    {
        title: 'ESTP',
        description: '실용주의 미니멀리스트',
        icon: '🛠️',
        color: 'from-orange-400 to-yellow-500'
    },
    {
        title: 'ESFP',
        description: '파티의 중심! 에너지 넘치는 인싸',
        icon: '🎉',
        color: 'from-pink-500 to-orange-400'
    },
    {
        title: 'ENFP',
        description: '감성적이지만 귀찮음 주의!',
        icon: '✨',
        color: 'from-emerald-400 to-yellow-400'
    },
    {
        title: 'ENTP',
        description: '아이디어 넘치는 토론가',
        icon: '🗣️',
        color: 'from-teal-500 to-green-500'
    },
    {
        title: 'ESTJ',
        description: '똑부러지는 현실주의 리더',
        icon: '🧑‍💼',
        color: 'from-blue-600 to-gray-500'
    },
    {
        title: 'ESFJ',
        description: '친절하고 따뜻한 분위기 메이커',
        icon: '☕',
        color: 'from-orange-300 to-pink-400'
    },
    {
        title: 'ENFJ',
        description: '사람을 이끄는 따뜻한 리더',
        icon: '🤝',
        color: 'from-red-400 to-rose-500'
    },
    {
        title: 'ENTJ',
        description: '야망 넘치는 추진력 갑',
        icon: '🚀',
        color: 'from-indigo-600 to-purple-600'
    }
]


export default function Section2() {
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
                    {mbtiCards?.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={'/'}
                                className="block p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:cursor-pointer group"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="text-4xl">{service.icon}</div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 mt-1">{service.description}</p>
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
    )
}
