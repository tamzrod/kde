# PrismConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.285501Z
**Run ID**: RUN-012
**Seed**: 1700000012

---

## Architecture

- Architecture: fully_distributed
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: lease_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: True

## Log Replication

- Type: replicated_log
- Structure: append_only_array
- Commit Method: majority_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: log_compaction

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: gossip
- Model: crash_stop

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 183ms
- Election Timeout Base: 273ms
- Election Timeout Range: 148ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:lease_based
- concept:term_epochs
- concept:randomized_timeout
- voting:hierarchical_quorum
- vote_granting:grant_based_on_priority
- concept:vote_revocations
- log:replicated_log
- log_structure:append_only_array
- commit:majority_commit
- recovery:snapshot_transfer
- snapshot:log_compaction
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 54
- Elections Succeeded: 36
- Election Success Rate: 66.67%
- Messages Sent: 166
- Commits: 9
- Avg Messages/Commit: 18.44
- Leader Changes: 36
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 56
- Elections Succeeded: 44
- Election Success Rate: 78.57%
- Messages Sent: 235
- Commits: 11
- Avg Messages/Commit: 21.36
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 51
- Elections Succeeded: 44
- Election Success Rate: 86.27%
- Messages Sent: 277
- Commits: 20
- Avg Messages/Commit: 13.85
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 49
- Elections Succeeded: 37
- Election Success Rate: 75.51%
- Messages Sent: 330
- Commits: 15
- Avg Messages/Commit: 22.00
- Leader Changes: 37
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

