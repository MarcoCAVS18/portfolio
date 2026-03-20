import { useRef } from 'react'

// Phone 1 screen corners in SVG root space
// Computed from path228 local coords → edge-line intersections → + translate(181.18, 189.34)
const PHONE1_MASK_D = 'M 26.3,202.8 L 268.1,131.5 L 422.6,655.1 L 180.9,726.3 Z'

// Phone 2 screen corners in SVG root space
// Same local corners → g387 matrix → + translate(181.18, 189.34)
// B=TL, A=TR, D=BR, C=BL (x-mirrored due to g387 negative a)
const PHONE2_MASK_D = 'M 318.5,33.7 L 569.2,59.3 L 513.5,602.3 L 262.8,576.7 Z'

// Phone 1 — affine transform mapping 705×1523 image to screen parallelogram
// (0,0)→TL(26.3,202.8) | (705,0)→TR(268.1,131.5) | (0,1523)→BL(180.9,726.3)
const PHONE1_TRANSFORM = 'matrix(0.34298,-0.10113,0.10151,0.34373,26.3,202.8)'

// Phone 2 — maps 1290×9561 image; scale=252/1290=0.1953; visible_height=2795px
// Scroll s image-px down: shift translation by (+0.019929*s, -0.19428*s)
const phone2Matrix = (s) =>
  `matrix(0.19434,0.01984,-0.019929,0.19428,${318.5 + 0.019929 * s},${33.7 - 0.19428 * s})`

export default function PhoneMockup() {
  const scrollImgRef = useRef(null)
  const hoverRef = useRef(null)

  function handleMouseMove(e) {
    if (!hoverRef.current || !scrollImgRef.current) return
    const rect = hoverRef.current.getBoundingClientRect()
    const relY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    scrollImgRef.current.setAttribute('transform', phone2Matrix(relY * 6766))
  }

  function handleMouseLeave() {
    scrollImgRef.current?.setAttribute('transform', phone2Matrix(0))
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Frame SVG */}
      <img
        src="/images/SVG/mockup.svg"
        style={{ width: '100%', display: 'block' }}
        alt="Phone mockup"
      />

      {/* Hover zone for phone 2 scroll — covers phone 2 screen area */}
      <div
        ref={hoverRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'absolute',
          left: '44%',
          top: '5%',
          width: '51%',
          height: '75%',
          cursor: 'ns-resize',
        }}
      />

      {/* Overlay SVG with screenshots */}
      <svg
        viewBox="0 0 600.02612 755.37425"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="pm-mask-p1" maskUnits="userSpaceOnUse">
            <rect width="600.02612" height="755.37425" fill="black" />
            <path d={PHONE1_MASK_D} fill="white" />
          </mask>
          <mask id="pm-mask-p2" maskUnits="userSpaceOnUse">
            <rect width="600.02612" height="755.37425" fill="black" />
            <path d={PHONE2_MASK_D} fill="white" />
          </mask>
        </defs>

        {/* Phone 1 — static */}
        <image
          href="/images/captura1.png"
          x="0"
          y="0"
          width="705"
          height="1523"
          mask="url(#pm-mask-p1)"
          transform={PHONE1_TRANSFORM}
          preserveAspectRatio="none"
        />

        {/* Phone 2 — hover scroll */}
        <image
          ref={scrollImgRef}
          href="/images/captura2.png"
          x="0"
          y="0"
          width="1290"
          height="9561"
          mask="url(#pm-mask-p2)"
          transform={phone2Matrix(0)}
          preserveAspectRatio="none"
        />
      </svg>
    </div>
  )
}
