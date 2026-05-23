import React, { useState, useEffect, useRef } from 'react'
import { generateBubbleSortStates, parseVizData } from '../utils/vizUtils.js'

function ArrayBars({ state }) {
  if (!state) return null
  const { arr, comparing, sorted } = state
  const max = Math.max(...arr)
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', flexWrap: 'wrap', padding: 8 }}>
      {arr.map((val, i) => {
        const isComparing = comparing.includes(i)
        const isSorted = sorted.includes(i)
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 28, borderRadius: '4px 4px 0 0',
              height: Math.max(20, Math.round(val / max * 80)),
              background: isComparing ? 'var(--pink)' : isSorted ? 'var(--green)' : 'var(--accent)',
              transition: 'all 0.3s ease'
            }} />
            <div style={{ fontSize: 10, fontFamily: 'var(--font-code)', color: 'var(--text2)' }}>{val}</div>
            <div style={{ fontSize: 9, color: 'var(--text3)' }}>{i}</div>
          </div>
        )
      })}
    </div>
  )
}

function BinarySearchViz({ data }) {
  const { nums, target } = data
  const max = Math.max(...nums)
  return (
    <div style={{ padding: 8 }}>
      <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 8 }}>
        Array — searching for <strong style={{ color: 'var(--amber)' }}>{target}</strong>
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        {nums.map((val, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 32, height: 36, borderRadius: '4px 4px 0 0',
              background: val === target ? 'var(--amber)' : 'var(--accent)'
            }} />
            <div style={{ fontSize: 10, fontFamily: 'var(--font-code)', color: 'var(--text2)' }}>{val}</div>
            <div style={{ fontSize: 9, color: 'var(--text3)' }}>{i}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Visualization({ vizType, vizData }) {
  const [states, setStates] = useState([])
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(400)
  const intervalRef = useRef(null)
  const parsedData = parseVizData(vizType, vizData)

  useEffect(() => {
    if (vizType === 'array_sort' && parsedData) {
      const s = generateBubbleSortStates([...parsedData])
      setStates(s)
      setIdx(0)
      setPlaying(false)
    }
  }, [vizType, vizData])

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setIdx(prev => {
          if (prev >= states.length - 1) { setPlaying(false); return prev }
          return prev + 1
        })
      }, speed)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing, speed, states.length])

  if (!vizType || vizType === 'none' || !vizData) return null

  return (
    <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: 10 }}>
        <i className="ti ti-chart-bar" /> Visualization
      </div>
      <div style={{
        background: 'var(--bg2)', borderRadius: 10,
        border: '1px solid var(--border)', minHeight: 120, overflow: 'auto'
      }}>
        {vizType === 'array_sort' && states.length > 0 && <ArrayBars state={states[idx]} />}
        {vizType === 'binary_search' && parsedData && <BinarySearchViz data={parsedData} />}
        {vizType !== 'array_sort' && vizType !== 'binary_search' && (
          <div style={{ padding: 16, fontSize: 13, color: 'var(--text2)', fontStyle: 'italic', textAlign: 'center' }}>
            {vizData}
          </div>
        )}
      </div>

      {vizType === 'array_sort' && states.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
          {[
            { label: '← Prev', action: () => setIdx(i => Math.max(0, i - 1)) },
            { label: playing ? '⏸ Pause' : '▶ Play', action: () => setPlaying(p => !p) },
            { label: 'Next →', action: () => setIdx(i => Math.min(states.length - 1, i + 1)) }
          ].map(({ label, action }) => (
            <button key={label} onClick={action} style={{
              padding: '5px 10px', borderRadius: 6, border: '1px solid var(--accent)',
              background: 'transparent', color: 'var(--accent2)', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'var(--font-ui)'
            }}>{label}</button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--font-code)' }}>
            Step {idx} / {states.length - 1}
          </span>
          <select value={speed} onChange={e => setSpeed(+e.target.value)}
            style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text2)', fontSize: 12 }}>
            <option value={800}>Slow</option>
            <option value={400}>Normal</option>
            <option value={150}>Fast</option>
          </select>
        </div>
      )}
    </div>
  )
}
