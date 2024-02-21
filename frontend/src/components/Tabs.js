
import { Tabs } from 'flowbite-react';
import { HiAdjustments } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';

export default function BasicTabs(props) {
    const data = props.data.attributes

    return (
        <Tabs aria-label="Default tabs" className='w-full justify-center'>
            <Tabs.Item title="รายละเอียด" icon={MdDashboard}>
                <ul class="grid lg:grid-cols-2  text-base font-base text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <svg class="w-8 h-8 inline-block mr-2 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.8 2c-.5 0-1 .2-1.3.6A2 2 0 0 0 6 3.9V21a1 1 0 0 0 1.6.8l4.4-3.5 4.4 3.5A1 1 0 0 0 18 21V3.9c0-.5-.2-1-.5-1.3-.4-.4-.8-.6-1.3-.6H7.8Z" />
                        </svg>
                        <span className='font-medium'>วิชา: </span>{data.subject}
                    </li>
                    <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <svg class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M17 10v1.1l1 .5.8-.8 1.4 1.4-.8.8.5 1H21v2h-1.1l-.5 1 .8.8-1.4 1.4-.8-.8a4 4 0 0 1-1 .5V20h-2v-1.1a4 4 0 0 1-1-.5l-.8.8-1.4-1.4.8-.8a4 4 0 0 1-.5-1H11v-2h1.1l.5-1-.8-.8 1.4-1.4.8.8a4 4 0 0 1 1-.5V10h2Zm.4 3.6c.4.4.6.8.6 1.4a2 2 0 0 1-3.4 1.4A2 2 0 0 1 16 13c.5 0 1 .2 1.4.6ZM5 8a4 4 0 1 1 8 .7 7 7 0 0 0-3.3 3.2A4 4 0 0 1 5 8Zm4.3 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h6.1a7 7 0 0 1-1.8-7Z" clip-rule="evenodd" />
                        </svg>
                        <span className='font-medium'>ผู้สอน: </span>{data.instructor_name}
                    </li>
                    <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <svg class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clip-rule="evenodd" />
                        </svg>
                        <span className='font-medium'>รูปแบบ: </span>{(data.study_type === "Online" ? "ออนไลน์" : "สดออนไลน์")}
                    </li>
                    <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <svg class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z" clip-rule="evenodd" />
                        </svg>
                        {/* {data.videos.data[0].attributes.duration} ชั่วโมง */}
                        <span className='font-medium'>ระยะเวลา: </span>25 ชั่วโมง
                    </li>
                    <li class="text-center w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <svg class="inline-block w-8 h-8 mr-2 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Zm2 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clip-rule="evenodd" />
                        </svg>
                        <span className='font-medium'>ยอดสั่งซื้อ: </span>{data.amount}{(data.maxamount) ? `/${data.maxamount}` : ''} คน
                    </li>
                </ul>
            </Tabs.Item>
            <Tabs.Item title="บทเรียน" icon={HiAdjustments}>
                <h1 className='whitespace-pre-line text-center mb-2 text-lg font-medium'>บทเรียนทั้งหมดในคอร์สนี้ ประกอบด้วย</h1>
                <div class="w-auto p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
                    <span class="whitespace-pre-line text-center mb-2 text-sm font-base tracking-tight text-gray-900 dark:text-white">
                        {data.detail}
                    </span>
                </div>
            </Tabs.Item>

        </Tabs>
    );
}