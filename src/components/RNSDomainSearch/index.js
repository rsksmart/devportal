export default function RNSDomainSearch() {
  return <form target="_blank" className="form mb-12" method="get" action="https://manager.rns.rifos.org/search">
    <div className="form-group">
      <div className="input-group">
        <input name="domain" required={true} maxLength={80} type="text" className="form-control" placeholder="find your domain"/>
        <span className="input-group-text">.rsk</span>
        <button type="submit" className="btn btn-no-shadow">Register!</button>
      </div>
    </div>
  </form>
}
