var totalPackets=0;
var totalDestIPs=[];
var totalSrcIPs=[];
var totalDstTcpPorts=[];
var totalSrcTcpPorts=[];
var totalDstUdpPorts=[];
var totalSrcUdpPorts=[];
var Fins=0;
var Syns=0;
var Rsts=0;
var Pshs=0;
var Acks=0;
var Urgs=0;
var Eces=0;
var Cws=0;
var FinSyns=0;
var FinPshs=0;
var SynPshs=0;
var FinAcks=0;
var SynAcks=0;
var AckRsts=0;
var PshAcks=0;
var FinPshAcks=0;
var rows = [];




















var fileSystem = require("fs");
var net = require('net');
var HOST = "0.0.0.0";
var PORT = 8001;
var schedule = require('node-schedule');


var j = schedule.scheduleJob('*/5 * * * * *', function () 
{
  try 
  {
    var client = new net.Socket();
    client.connect(8009, '127.0.0.1', function () 
    {
      var obj=
      {
          total_packets:rows.length,
          total_dest_ips:totalDestIPs.length,
          total_src_ips:totalSrcIPs.length,
          total_dest_tcp_ports:totalDstTcpPorts.length,
          total_src_tcp_ports:totalSrcTcpPorts.length,
          total_dest_udp_ports:totalDstUdpPorts.length,
          total_src_udp_ports:totalSrcUdpPorts.length,
          fins:Fins,
          syns:Syns,
          rsts:Rsts,
          pshs:Pshs,
          acks:Acks,
          urgs:Urgs,
          eces:Eces,
          cws:Cws,
          fin_syns:FinSyns,
          fin_pshs:FinPshs,
          syn_pshs:SynPshs,
          fin_acks:FinAcks,
          syn_acks:SynAcks,
          ack_rsts:AckRsts,
          psh_acks:PshAcks,
          fin_psh_acks:FinPshAcks
        };

      // client.write(JSON.stringify(rows));
      //console.log(rows.length +" "+new Date().getTime());
      //client.write('{"key":"'+rows.length+'"}');
      client.write(JSON.stringify(obj));
      reset();
      client.destroy();
    });
    client.on('error', function (err) 
    {
      console.log(err.message);
      reset();
    });
  }
  catch (error) 
  {
    reset();
    console.log("---------  " + error);
  }
});

net.createServer(function (socket) 
{
  console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
  socket.on('data', function (data) 
  {
    data = "" + String(data);
    data.split('\n').forEach(row => {
      if (row.length != 0) 
      {
        try 
        {
          row = JSON.parse(row);
          var tmp = row["frame.protocols"];
          if (tmp.split(':').slice(4, 5) == "ssl") 
          {
            row["frame.protocols"] = tmp.split(':').slice(1, 5).join(":");
          }
          else if (tmp.split(':').slice(4, 5) == "http") 
          {
            row["frame.protocols"] = tmp.split(':').slice(1, 6).join(":");
          }
          else if (tmp.split(':').slice(4, 5) == "icmp") 
          {
            row["frame.protocols"] = tmp.split(':').slice(1, 9).join(":");
          }
          else if (tmp.split(':').slice(4, 5) == "ldap") 
          {
            row["frame.protocols"] = tmp.split(':').slice(1, 5).join(":");
          }
          else if (tmp.split(':').slice(3, 4) == "udp") 
          {
            row["frame.protocols"] = tmp.split(':').slice(1, 6).join(":");
          }
          else 
          {
            row["frame.protocols"] = tmp.split(':').slice(1, 6).join(":");
          }
          try { if (row["tcp.flags"] == "0x00000001") { row.flags_fin = true; Fins++; } else { row.flags_fin = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000002") { row.flags_syn = true; Syns++; } else { row.flags_syn = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000004") { row.flags_rst = true; Rsts++; } else { row.flags_rst = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000008") { row.flags_psh = true; Pshs++;} else { row.flags_psh = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000010") { row.flags_ack = true; Acks++; } else { row.flags_ack = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000020") { row.flags_urg = true; Urgs++;} else { row.flags_urg = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000040") { row.flags_ece = true; Eces++;} else { row.flags_ece = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000080") { row.flags_cw = true; Cws++;} else { row.flags_cw = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000003") { row.flags_fin_syn = true; FinSyns++;} else { row.flags_fin_syn = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000009") { row.flags_fin_psh = true; FinPshs++;} else { row.flags_fin_psh = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x0000000A") { row.flags_syn_psh = true; SynPshs++;} else { row.flags_syn_psh = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000011") { row.flags_fin_ack = true; FinAcks++;} else { row.flags_fin_ack = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000012") { row.flags_syn_ack = true; SynAcks++;} else { row.flags_syn_ack = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000014") { row.flags_ack_rst = true; AckRsts++;} else { row.flags_ack_rst = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000018") { row.flags_psh_ack = true; PshAcks++;} else { row.flags_psh_ack = false; } } catch (error) { }
          try { if (row["tcp.flags"] == "0x00000019") { row.flags_fin_psh_ack = true; FinPshAcks++;} else { row.flags_fin_psh_ack = false; } } catch (error) { }
          
          hashPush(totalDestIPs,row["ip.dst"]);
          hashPush(totalSrcIPs,row["ip.src"]);
          hashPush(totalDstTcpPorts,row["tcp.dstport"]);
          hashPush(totalSrcTcpPorts,row["tcp.srcport"]);
          hashPush(totalDstUdpPorts,row["udp.dstport"]);
          hashPush(totalSrcUdpPorts,row["udp.srcport"]);

          rows.push(row);
        }
        catch (error) 
        {
          console.log(error + "");
        }
      }
    });
    console.log(rows.length);
  });
  socket.on('close', function (data) 
  {
    console.log('CLOSED: ' + socket.remoteAddress + ' ' + socket.remotePort);
  });
}).listen(PORT, HOST);
console.log('Server listening on ' + HOST + ':' + PORT);






function hashPush(array,element)
{
    if(!array.includes(element)) array.push(element);
}

function reset()
{
  totalPackets=[];
  totalDestIPs=[];
  totalSrcIPs=[];
  totalDstTcpPorts=[];
  totalSrcTcpPorts=[];
  totalDstUdpPorts=[];
  totalSrcUdpPorts=[];
  Fins=0;
  Syns=0;
  Rsts=0;
  Pshs=0;
  Acks=0;
  Urgs=0;
  Eces=0;
  Cws=0;
  FinSyns=0;
  FinPshs=0;
  SynPshs=0;
  FinAcks=0;
  SynAcks=0;
  AckRsts=0;
  PshAcks=0;
  FinPshAcks=0;
  rows = [];
}